const fs = require('fs-extra');
const path = require('path');
const serviceArticle = require('../article');
const serviceUser = require('../user');
const utils = require(path.resolve(process.cwd(), 'routes', 'utils'));

const list = (articleId, cb) => {
    const list = [];

    utils.readfile(
        path.resolve(process.cwd(), 'routes', 'db', 'comments', articleId, `./${articleId}.db.txt`),
        true,
        [],
        (err, list) => {
            if (err) {
                cb(err);
            }
            else {
                cb(null, list);
            }
        }
    );
};

const postComment = (articleId, user, createTime, content, quotation, cb) => {
    const data = {
        commentId: Date.now(),
        user,
        createTime,
        content,
        quotation
    };

    const commentFilePath = path.resolve(process.cwd(), 'routes', 'db', 'comments', articleId, `./${articleId}.db.txt`);

    fs.ensureFile(
        commentFilePath,
        (err) => {
            if (err) {
                cb(err);
                return;
            }
            else {
                list(articleId, (err, list) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        list.unshift(data);

                        fs.writeFile(
                            commentFilePath,
                            JSON.stringify(list),
                            'utf8',
                            (err) => {
                                if (err) {
                                    cb(err);
                                }
                                else {
                                    // 文章评论数加1
                                    serviceArticle.changeComments(articleId, (err) => {
                                        cb(err);
                                    });
                                }
                            }
                        );
                    }
                });
            }
        }
    );
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
    postWithUserPassword
};