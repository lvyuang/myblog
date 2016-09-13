const express = require('express');
const router = express.Router();
const serviceArticle = require('./services/article');
const serviceComment = require('./services/comment');
const errorFormat = require('./utils/error-format.js');
const utils = require('./utils');

/**
    获取文章列表
    GET: /api/article/list
    PARAMS:
        [start]: {Number}, // 起始位置，默认0
        [end]: {Number}, // 截止位置，默认-1
        [category]: {String} // 目录，默认为null
    RETURNS:
        [
            {
                articleId: {Number},
                title: {String},
                createTime: {Timestamp},
                commentListLength: {Number},
                desc: {String},
                url: {String},
                categories: [{id: {String}, name: {String}}]
            }
        ]
 */
router.get('/api/article/list', (req, res) => {
    const params = req.data;
    const {start, end, category} = params;

    serviceArticle.list(start, end, category, (err, result) => {
        if (err) {
            res.json(errorFormat(err));
            return;
        }

        res.json(result.map(item => {
            return Object.assign({}, item, {createTime: utils.dateFormat(item.createTime)});
        }));
    });
});

/**
    获取文章元数据
    GET: /api/article/info
    PARAMS:
        articleId: {Number}
    RETURNS:
        {
            articleId: {String},
            title: {String},
            subtitle: {String},
            createTime: {Timestamp},
            desc: {String},
            url: {String},
            commentListLength: {Number},
            categories: [{id: {String}, name: {String}}],
            content: {String}
        }
 */
router.get('/api/article/info', (req, res) => {
    const params = req.data;
    const {articleId} = params;

    serviceArticle.info(articleId, (err, result) => {
        if (err) {
            res.json(errorFormat(err));
            return;
        }

        res.json(Object.assign({}, result, {createTime: utils.dateFormat(result.createTime)}));
    });
});

/**
    获取文章路由列表
    GET: /api/article/routes
    PARAMS: null
    RETURNS:
        [
            {
                articleId: {String},
                url: {String}
            }
        ]
 */
router.get('/api/article/routes', (req, res) => {
    serviceArticle.routes((err, result) => {
        if (err) {
            res.json(errorFormat(err));
            return;
        }

        res.json(result);
    });
});

/**
    获取文章评论
    GET: /api/article/comments
    PARAMS:
        articleId: {Number}
    RETURNS:
        [
            {
                commentId: {Number},
                user: {String},
                createTime: {Timestamp},
                content: {String},
                [quotation]: {
                    user: {String},
                    content: {String}
                }
            }
        ]
 */
router.get('/api/article/comments', (req, res) => {
    // const data = [
    //     {
    //         commentId: 0,
    //         user: '用户A',
    //         createTime: 1471842740906,
    //         content: '我是评论我是评论我是评论我是评论我是评论我是评论我是评论',
    //         quotation: {
    //             user: '用户B',
    //             content: '我是引用我是引用我是引用我是引用我是引用'
    //         }
    //     },
    //     {
    //         commentId: 1,
    //         user: '用户C',
    //         createTime: 1471842740906,
    //         content: '我是评论我是评论我是评论我是评论我是评论我是评论我是评论'
    //     }
    // ];
    const params = req.data;

    serviceComment.list(params.articleId, (err, result) => {
        if (err) {
            res.json(errorFormat(err));
            return;
        }

        res.json(result.map(item => {
            return Object.assign({}, item, {createTime: utils.datetimeFormat(item.createTime)});
        }));
    });
});

/**
    发表评论
    POST: /api/article/comment
    PARAMS:
        articleId: {Number},
        token: {String},
        createTime: {Timestamp},
        content: {String},
        [quotation]: {
            user: {String},
            content: {String}
        }
    RETURNS:
        {
            ok: true
        }
 */
router.post('/api/article/comment', (req, res) => {
    const params = req.data;
    const {articleId, token, createTime, content, quotation} = params;

    serviceComment.post(articleId, token, createTime, content, quotation, (err) => {
        if (err) {
            res.json(errorFormat(err));
            return;
        }

        res.json({
            ok: true
        });
    });
});

/**
    注册并发表评论
    POST: /api/article/commentWithUserPassword
    PARAMS:
        articleId: {Number},
        user: {String},
        password: {String},
        createTime: {Timestamp},
        content: {String},
        [quotation]: {
            user: {String},
            content: {String}
        }
    RETURNS:
        {
            token: {String}
        }
 */
router.post('/api/article/commentWithUserPassword', (req, res) => {
    const params = req.data;
    const {articleId, user, password, createTime, content, quotation} = params;

    serviceComment.postWithUserPassword(articleId, user, password, createTime, content, quotation, (err, token) => {
        if (err) {
            res.json(errorFormat(err));
            return;
        }

        res.json({
            token
        });
    });
});

module.exports = router;