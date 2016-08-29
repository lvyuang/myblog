const fs = require('fs-extra');
const path = require('path');
const articleDbPath = path.resolve(process.cwd(), 'routes', 'db', 'article', 'article-list.db.txt');
const utils = require(path.resolve(process.cwd(), 'routes', 'utils'));

const info = (articleId, cb) => {
    utils.readfile(
        articleDbPath,
        true,
        [],
        (err, db) => {
            if (err) {
                cb(err);
                return;
            }

            const result = db.filter(item => {
                return item.articleId === articleId;
            });

            if (result.length > 0) {
                const info = result[0];

                utils.readfile(
                    path.resolve(process.cwd(), 'routes', 'db', 'article', `${info.articleId}.html`),
                    false,
                    '',
                    (err, html) => {
                        if (err) {
                            cb(err);
                            return;
                        }

                        info.content = html;
                        cb(null, info);
                    }
                );
            }
            else {
                cb({
                    name: 'ERR_NO_ITEM',
                    message: '没有找到文章数据，文章ID:' + articleId
                });
            }
        }
    );
};

const list = (startIndex = 0, length = 10, category, cb) => {
    utils.readfile(
        articleDbPath,
        true,
        [],
        (err, db) => {
            if (err) {
                cb(err);
                return;
            }

            let result = db;

            if (category) {
                result = result.filter(item => {
                    const temp = item.categories && item.categories.filter(categoryItem => {
                        return category === categoryItem.name;
                    });

                    return temp.length > 0;
                });
            }

            if (startIndex >= 0) {
                result = result.slice(startIndex, startIndex + length);
            }

            result = result.map(item => {
                return Object.assign(
                    {},
                    item,
                    {
                        createTime: utils.dateFormat(item.createTime)
                    }
                );
            });

            cb(null, result);
        }
    );
};

const changeComments = (articleId, cb) => {
    fs.ensureFile(articleDbPath, (err) => {
        if (err) {
            cb(err);
            return;
        }

        utils.readfile(
            articleDbPath,
            true,
            [],
            (err, db) => {
                if (err) {
                    cb(err);
                    return;
                }

                db.forEach(item => {
                    if (item.articleId === articleId) {
                        item.comments++;
                    }
                });

                fs.writeFile(articleDbPath, JSON.stringify(db, null, '    '), 'utf8', (err) => {
                    if (err) {
                        cb(err);
                    }
                    else {
                        cb(null);
                    }
                });
            }
        );
    });
};

const routes = (cb) => {
    utils.readfile(
        articleDbPath,
        true,
        [],
        (err, db) => {
            if (err) {
                cb(err);
                return;
            }

            cb(null, db.map(item => {
                return {
                    articleId: item.articleId,
                    url: item.url
                };
            }));
        }
    );
};

module.exports = {
    list,
    info,
    routes,
    changeComments
};