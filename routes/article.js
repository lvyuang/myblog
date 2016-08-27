const express = require('express');
const router = express.Router();
const serviceArticle = require('./services/article');
const serviceComment = require('./services/comment');

/**
    获取文章列表
    GET: /api/article/list
    PARAMS:
        [startIndex]: {Number}, // 起始位置，默认0
        [length]: {Number}, // 长度，默认10
        [category]: {String} // 目录，默认为null
    RETURNS:
        [
            {
                articleId: {Number},
                title: {String},
                createTime: {Timestamp},
                comments: {Number},
                desc: {String},
                url: {String},
                categories: [{id: {String}, name: {String}}]
            }
        ]
 */
router.get('/api/article/list', (req, res) => {
    const params = req.data;
    const {startIndex, length, category} = params;

    serviceArticle.list(startIndex, length, category, (err, result) => {
        if (err) {
            res.json(err);
            return;
        }

        res.json(result);
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
            comments: {Number},
            categories: [{id: {String}, name: {String}}],
            content: {String}
        }
 */
router.get('/api/article/info', (req, res) => {
    const params = req.data;
    const {articleId} = params;

    serviceArticle.info(articleId, (err, result) => {
        if (err) {
            res.json(err);
            return;
        }

        res.json(result);
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
            res.json(err);
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
            res.json(err);
            return;
        }

        res.json(result);
    });
});

/**
    发表评论
    POST: /api/article/comment
    PARAMS:
        articleId: {Number},
        user: {String},
        content: {String},
        createTime: {Timestamp},
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
    const {articleId, user, createTime, content, quotation} = params;

    serviceComment.post(articleId, user, createTime, content, quotation, (err) => {
        if (err) {
            res.json(err);
            return;
        }

        res.json({
            ok: true
        });
    });
});

/**
    删除评论
    DELETE: /api/article/comment
    PARAMS:
        commentId: {Number}
    RETURNS:
        {
            ok: true
        }
 */
router.delete('/api/article/comment', (req, res) => {
    res.json({
        method: 'delete'
    });
});

module.exports = router;