const fs = require('fs-extra');
const path = require('path');
const utils = require(path.resolve(process.cwd(), 'routes', 'utils'));

const userDbPath = `${process.cwd()}/routes/db/user/user.db.txt`;
const userSessionPath = `${process.cwd()}/routes/db/user/user.session.txt`;

const updateUserSession = (token, user, cb) => {
    fs.ensureFile(userSessionPath, (err) => {
        if (err) {
            cb(err);
        }
        else {
            utils.readfile(userSessionPath, true, {}, (err, userSession) => {
                if (err) {
                    cb(err);
                }
                else {
                    userSession[token] = {user, createTime: Date.now()};

                    fs.writeFile(userSessionPath, JSON.stringify(userSession), 'utf8', (err) => {
                        if (err) {
                            cb(err);
                        }
                        else {
                            cb(null);
                        }
                    });
                }
            });
        }
    });
};

const generateToken = (user) => {
    return Date.now() + '|' + user;
};

const auth = (token, cb) => {
    utils.readfile(userSessionPath, true, {}, (err, userSession) => {
        if (err) {
            cb(err);
        }
        else {
            if (userSession.hasOwnProperty(token)) {
                updateUserSession(token, userSession[token].user, (err) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        cb(null, userSession[token].user);
                    }
                });
            }
            else {
                cb({
                    name: 'USER_SESSION_EXPIRED',
                    message: '用户登录时效已过期，请重新登录。'
                });
            }
        }
    });
};

const register = (user, password, cb) => {
    fs.ensureFile(userDbPath, (err) => {
        if (err) {
            cb(err);
            return;
        }

        utils.readfile(userDbPath, true, {}, (err, userMap) => {
            if (err) {
                cb(err);
                return;
            }

            if (userMap.hasOwnProperty(user)) {
                cb({
                    name: 'USER_REPEATED',
                    message: '用户名重复'
                });
            }
            else {
                userMap[user] = password;

                fs.writeFile(userDbPath, JSON.stringify(userMap), 'utf8', (err) => {
                    if (err) {
                        cb(err);
                    }
                    else {
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
                });
            }
        });
    });
};

const signin = (user, password, cb) => {
    utils.readfile(userDbPath, true, {}, (err, userMap) => {
        if (err) {
            cb(err);
        }
        else {
            if (userMap.hasOwnProperty(user) && userMap[user] === password) {
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
        }
    });
};

const signout = (token, cb) => {
    fs.ensureFile(userSessionPath, (err) => {
        if (err) {
            cb(err);
        }
        else {
            utils.readfile(userSessionPath, true, {}, (err, userSession) => {
                if (err) {
                    cb(err);
                }
                else {
                    if (userSession.hasOwnProperty(token)) {
                        delete userSession.token;

                        fs.writeFile(userSessionPath, JSON.stringify(userSession), 'utf8', (err) => {
                            if (err) {
                                cb(err);
                            }
                            else {
                                cb(null);
                            }
                        });
                    }
                    else {
                        cb(null);
                    }
                }
            });
        }
    });
};

const exist = (user, cb) => {
    utils.readfile(userDbPath, true, {}, (err, userMap) => {
        if (err) {
            cb(err);
        }
        else {
            if (userMap.hasOwnProperty(user)) {
                cb(null, true);
            }
            else {
                cb(null, false);
            }
        }
    });
};

module.exports = {
    auth,
    register,
    signin,
    signout,
    exist
};