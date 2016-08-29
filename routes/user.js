const express = require('express');
const router = express.Router();

const serviceUser = require('./services/user');
const errorFormat = require('./utils/error-format.js');

/**
    用户注册
    POST: /api/user/register
    PARAMS:
        user: {String},
        password: {String}
    RETURNS:
        {
            token: {String}
        }
 */
router.post('/api/user/register', (req, res) => {
    const {user, password} = req.data;

    serviceUser.register(user, password, (err, token) => {
        if (err) {
            res.json(errorFormat(err));
        }
        else {
            res.json({token})
        }
    });
});

/**
    用户是否存在
    GET: /api/user/exist
    PARAMS:
        user: {String}
    RETURNS:
        {
            isExisted: {Boolean}
        }
 */
router.get('/api/user/exist', (req, res) => {
    const {user} = req.data;

    serviceUser.exist(user, (err, result) => {
        if (err) {
            res.json(errorFormat(err));
        }
        else {
            res.json({
                isExisted: result
            });
        }
    });
});

/**
    用户登录
    POST: /api/user/signin
    PARAMS:
        user: {String},
        password: {String}
    RETURNS:
        {
            token: {String}
        }
 */
router.post('/api/user/signin', (req, res) => {
    const {user, password} = req.data;

    serviceUser.exist(user, password, (err, token) => {
        if (err) {
            res.json(errorFormat(err));
        }
        else {
            res.json({
                token
            });
        }
    });
});

/**
    用户登出
    POST: /api/user/signout
    PARAMS:
        token: {String}
    RETURNS:
        {
            ok: true
        }
 */
router.post('/api/user/signout', (req, res) => {
    const {token} = req.data;

    serviceUser.exist(token, (err) => {
        if (err) {
            res.json(errorFormat(err));
        }
        else {
            res.json({ok: true});
        }
    });
});

module.exports = router;