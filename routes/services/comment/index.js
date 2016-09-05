const path = require('path');
const serviceUser = require('../user');
const client = require(path.resolve(process.cwd(), 'routes', 'db'));

const list = (articleId, cb) => {
    client.zrevrangeAsync(`comment-list:${articleId}`, 0, -1).then(res => {
        // COMMANDS:
        // [1, 2] =>
        // [['hgetall', 'comment:1'], ['hgetall', 'comment:2']]
        const commentIdList = res;
        client.batch(
            commentIdList.map(commentId => {
                return ['hgetall', `comment:${commentId}`];
            })
        ).execAsync().then(res => {
            cb(null, res.map(comment => {
                if (comment.quotationUser && comment.quotationContent) {
                    return {
                        commentId: comment.commentId,
                        user: comment.user,
                        createTime: parseInt(comment.createTime),
                        content: comment.content,
                        quotation: {
                            user: comment.quotationUser,
                            content: comment.quotationContent
                        }
                    };
                }
                else {
                    return comment;
                }
            }))
        }).catch(cb);
    }).catch(cb);
};

const postComment = (articleId, user, createTime, content, quotation, cb) => {
    client.watch('comment-id');

    client.getAsync('comment-id').then(res => {
        if (!res) {
            res = 0;
        }

        const commentId = parseInt(res) + 1;

        let params = [
            'commentId',
            commentId,
            'user',
            user,
            'createTime',
            createTime,
            'content',
            content
        ];

        if (quotation) {
            params = params.concat([
                'quotationUser',
                quotation.user,
                'quotationContent',
                quotation.content
            ]);
        }

        client.multi([
            ['incr', 'comment-id'],
            ['hmset', `comment:${commentId}`].concat(params),
            ['zadd', `comment-list:${articleId}`, createTime, commentId]
        ]).execAsync(res => {
            cb(null, res);
        }).catch(cb);
    }).catch(cb);
};

const post = (articleId, token, createTime, content, quotation, cb) => {
    serviceUser.auth(token, (err, user) => {
        if (err) {
            cb(err);
        }
        else {
            postComment(articleId, user, createTime, content, quotation, cb);
        }
    });
};

const postWithUserPassword = (articleId, user, password, createTime, content, quotation, cb) => {
    serviceUser.exist(user, (err, isExisted) => {
        if (err) {
            cb(err);
        }
        else {
            if (isExisted) {
                serviceUser.signin(user, password, (err, token) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        postComment(articleId, user, createTime, content, quotation, (err) => {
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
            else {
                serviceUser.register(user, password, (err, token) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        postComment(articleId, user, createTime, content, quotation, (err) => {
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
        }
    });
};

module.exports = {
    list,
    post,
    postWithUserPassword,
    postComment
};