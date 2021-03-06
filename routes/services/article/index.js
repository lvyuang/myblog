const client = require('../../db');

const info = (articleId, cb) => {
    client.batch([
        ['hgetall', `article:${articleId}`],
        ['lrange', `article:${articleId}:categories`, 0, -1],
        ['zcard', `comment-list:${articleId}`],
        ['get', `article:${articleId}:content`]
    ]).execAsync().then(res => {
        const articleInfo = res[0];
        const categoryIdList = res[1];
        const commentListLength = res[2];
        const content = res[3];

        articleInfo.commentListLength = commentListLength;
        articleInfo.content = content;

        if (categoryIdList.length > 0) {
            return client.batch(
                categoryIdList.map(categoryId => {
                    return ['hgetall', `category:${categoryId}`];
                })
            ).execAsync().then(res => {
                const categories = res;

                cb(
                    null,
                    Object.assign({}, articleInfo, {categories})
                );
            }).catch(cb);
        }
        else {
            cb(
                null,
                Object.assign({}, articleInfo, {categories: []})
            );
        }
    }).catch(cb);
};

const list = (start = 0, end = -1, category, cb) => {
    let key;

    if (!category) {
        key = 'article-list';
    }
    else {
        key = `article-list:${category}`;
    }

    client.zrevrangeAsync(key, start, end).then(res => {
        if (res.length > 0) {
            const articleIdList = res;
            // 构建COMMANDS：
            // [1, 2] =>
            // [
            //     [
            //         ["hgetall", "article:1"],
            //         ["zcard", "comment-list:1"],
            //         ["lrange", "article:1:categories", 0, -1]
            //     ],
            //     [
            //         ["hgetall", "article:2"],
            //         ["zcard", "comment-list:2"],
            //         ["lrange", "article:2:categories", 0, -1]
            //     ]
            // ] =>
            // [
            //     ["hgetall", "article:1"],
            //     ["zcard", "comment-list:1"],
            //     ["lrange", "article:1:categories", 0, -1],
            //     ["hgetall", "article:2"],
            //     ["zcard", "comment-list:2"],
            //     ["lrange", "article:2:categories", 0, -1]
            // ] =>
            // [
            //     ["hgetall", "article:1"],
            //     ["zcard", "comment-list:1"],
            //     ["lrange", "article:1:categories", 0, -1],
            //     ["hgetall", "article:2"],
            //     ["zcard", "comment-list:2"],
            //     ["lrange", "article:2:categories", 0, -1],
            //     ["smembers", "category-list"]
            // ]
            const commands = articleIdList
                .map(articleId => {
                    return [
                        ['hgetall', `article:${articleId}`],
                        ['zcard', `comment-list:${articleId}`],
                        ['lrange', `article:${articleId}:categories`, 0, -1]
                    ];
                })
                .reduce((next, current) => {
                    while (current.length > 0) {
                        next.push(current.shift());
                    }

                    return next;
                }, []);

            commands.push(['smembers', 'category-list']);

            // 处理返回结果
            // [{..., createTime: "123456"}, 1, ['cat1'], {..., createTime: "678902"}, 2, ['cat1', 'cat2']] =>
            // [{..., createTime: 123456}, 1, {..., createTime: 678902}, 2] =>
            // [{..., createTime: 123456, commentListLength: 1}, {..., createTime: 678902, commentListLength: 2}]
            client.batch(commands).execAsync().then(res => {
                const articleList = res.slice(0, res.length - 1);
                const categoryIdList = res[res.length - 1];

                client.batch(categoryIdList.map(categoryId => {
                    return ['hgetall', `category:${categoryId}`];
                })).execAsync().then(categoryList => {
                    cb(null, articleList.reduce((next, current, index) => {
                        if (index % 3 === 0) {
                            next.push(Object.assign({}, current, {createTime: parseInt(current.createTime)}));
                            return next;
                        }
                        else if (index % 3 === 1) {
                            next[next.length - 1].commentListLength = current;
                            return next;
                        }
                        else if (index % 3 === 2) {
                            next[next.length - 1].categories = current.map(categoryId => {
                                const res = categoryList.filter(categoryItem => {
                                    return categoryItem.categoryId === categoryId;
                                });

                                if (res && res.length > 0) {
                                    return res[0];
                                }
                            });

                            return next;
                        }
                    }, []));
                }).catch(cb);
            }).catch(cb);
        }
        else {
            cb(null, []);
        }
    }).catch(cb);
};

const routes = (cb) => {
    client.zrangeAsync('article-list', 0, -1).then(res => {
        // COMMANDS:
        // [1, 2] =>
        // [['hgetall', 'article:1'], ['hgetall', 'article:2']]
        const articleIdList = res;

        if (articleIdList.length > 0) {
            client.batch(
                articleIdList.map(articleId => {
                    return ['hgetall', `article:${articleId}`];
                })
            ).execAsync().then(res => {
                cb(null, res.map(article => {
                    return {
                        articleId: article.articleId,
                        url: article.url,
                        title: article.title,
                        subtitle: article.subtitle,
                        desc: article.desc
                    };
                }));
            }).catch(cb);
        }
        else {
            cb(null, []);
        }
    }).catch(cb);
};

const post = (articleId, title, subtitle, createTime, desc, url, categories, content, cb) => {
    let params = [];

    client.existsAsync(`article:${articleId}`).then(res => {
        if (res) {
            cb({
                name: 'ARTICLE_ID_REPEATED',
                message: 'articleId重复'
            });
        }
        else {
            client.batch(
                [
                    ['hmset', `article:${articleId}`, 'articleId', articleId, 'title', title, 'subtitle', subtitle, 'createTime', createTime, 'desc', desc, 'url', url],
                    ['rpush', `article:${articleId}:categories`].concat(categories.map(category => {return category.categoryId;})),
                    ['set', `article:${articleId}:content`, content],
                    ['zadd', 'article-list', createTime, articleId],
                    ['sadd', 'category-list'].concat(categories.map(category => {return category.categoryId;}))
                ]
                .concat(categories.map(category => {
                    return ['zadd', `article-list:${category.categoryId}`, createTime, articleId];
                }))
                .concat(categories.map(category => {
                    return ['hmset', `category:${category.categoryId}`, 'categoryId', category.categoryId, 'categoryName', category.categoryName]
                }))
            ).execAsync().then(res => {
                cb(null, res);
            }).catch(cb);
        }
    }).catch(cb);
};

const remove = (articleId, cb) => {
    client.lrangeAsync(`article:${articleId}:categories`, 0, -1).then(categoryIdList => {
        client.batch(
            [
                ['del', `article:${articleId}`],
                ['del', `article:${articleId}:categories`],
                ['del', `article:${articleId}:content`],
                ['zrem', 'article-list', articleId]
            ]
            .concat(categoryIdList.map(
                categoryId => {
                    return ['zrem', `article-list:${categoryId}`, articleId];
                }
            ))
            .concat(categoryIdList.map(
                categoryId => {
                    return ['srem', `category-list`, categoryId];
                }
            ))
            .concat(categoryIdList.map(
                categoryId => {
                    return ['del', `category:${categoryId}`];
                }
            ))
        ).execAsync().then(res => {
            cb(null, res);
        }).catch(cb);
    }).catch(cb);
};

module.exports = {
    list,
    info,
    post,
    remove,
    routes
};