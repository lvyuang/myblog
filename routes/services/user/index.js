const client = require('../../db');
const crypto = require('crypto');

const updateUserSession = (token, user, cb) => {
    client
        .hgetAsync('session-list', user)
        .then(oldToken => {
            const params = [];
            if (oldToken) {
                params.push([
                    'hdel', 'session-list', oldToken
                ]);
            }

            params.push([
                'hmset', 'session-list',
                token, user,
                user, token
            ]);

            client
                .multi(params)
                .execAsync()
                .then(res => {
                    cb(null, res);
                })
                .catch(cb);
        })
        .catch(cb);
};

const generateToken = (user) => {
    const hash = crypto.createHash('sha256');

    hash.update(Date.now() + '|' + user);
    return hash.digest('hex');
};

const auth = (token, cb) => {
    client
        .hgetAsync('session-list', token)
        .then(res => {
            if (res) {
                cb(null, res);
            }
            else {
                cb({
                    name: 'USER_SESSION_EXPIRED',
                    message: '用户登录时效已过期，请重新登录。'
                });
            }
        })
        .catch(cb);
};

const register = (user, password, cb) => {
    client
        .existsAsync(`user:${user}`)
        .then(res => {
            if (res) {
                cb({
                    name: 'USER_REPEATED',
                    message: '用户名重复'
                });

                return;
            }

            client
                .batch([
                    ['hmset', `user:${user}`, 'userId', user, 'password', password],
                    ['zadd', 'user-list', Date.now(), user]
                ])
                .execAsync()
                .then(res => {
                    const token = generateToken(user);

                    updateUserSession(token, user, (err) => {
                        if (err) {
                            cb(err);
                        }
                        else {
                            cb(null, token);
                        }
                    });
                })
                .catch(cb);
        })
        .catch(cb);
};

const signin = (user, password, cb) => {
    client.hgetallAsync(`user:${user}`)
        .then(res => {
            if (res && res.password === password) {
                const token = generateToken(user);

                updateUserSession(token, user, (err) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        cb(null, token);
                    }
                });
            }
            else {
                cb({
                    name: 'USER_SIGNIN_FAILED',
                    message: '用户登录失败，用户名不存在或者密码不正确。'
                });
            }
        })
        .catch(cb);
};

const signout = (token, cb) => {
    client
        .hgetAsync(
            'session-list',
            token
        )
        .then(user => {
            if (user) {
                client
                    .hdelAsync(
                        'session-list',
                        token,
                        user
                    )
                    .then(res => {
                        cb(null, res);
                    })
                    .catch(cb);
            }
            else {
                cb(null);
            }
        })
        .catch(cb);
};

const exist = (user, cb) => {
    client
        .existsAsync(`user:${user}`)
        .then(res => {
            cb(null, !!res);
        })
        .catch(cb);
};

module.exports = {
    auth,
    register,
    signin,
    signout,
    exist,
    updateUserSession,
    generateToken
};