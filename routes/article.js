const express = require('express');
const router = express.Router();
const data = require('./data');

/**
    获取文章列表
    GET: /api/article/list
    PARAMS:
        [startIndex]: {Number}, // 起始位置，默认0
        [length]: {Number} // 长度，默认10
    RETURNS:
        [
            {
                articleId: {Number},
                title: {String},
                createTime: {Timestamp},
                comments: {Number},
                desc: {String},
                url: {String},
                tags: [{String}]
            }
        ]
 */
router.get('/api/article/list', (req, res) => {
    res.json({
        ok: true
    });
});

/**
    获取文章
    GET: /api/article
    PARAMS:
        articleId: {Number}
    RETURNS:
        {
            title: {String},
            content: {String},
            createTime: {Timestamp},
            tags: [{String}]
        }
 */
router.get('/api/article', (req, res) => {
    res.json({
        ok: true
    });
});

/**
    发表文章
    POST: /api/article
    PARAMS:
        author: {String}, // 目前只取值'lvquan'
        createTime: {Timestamp},
        title: {String},
        content: {String},
        desc: {String},
        tags: [{String}]
    RETURNS:
        {
            ok: true
        }
 */
router.post('/api/article', (req, res) => {
    res.json({
        ok: true
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
                email: {String},
                createTime: {Timestamp},
                content: {String},
                [quote]: {
                    user: {String},
                    content: {String}
                }
            }
        ]
 */
router.get('/api/article/comments', (req, res) => {
    res.json({
        ok: true
    });
});

/**
    发表评论
    POST: /api/article/comment
    PARAMS:
        articleId: {Number},
        user: {String},
        email: {String},
        content: {String},
        createTime: {Timestamp},
        [quote]: {
            user: {String},
            content: {String}
        }
    RETURNS:
        {
            ok: true
        }
 */
router.post('/api/article/comment', (req, res) => {
    res.json({
        method: 'post'
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