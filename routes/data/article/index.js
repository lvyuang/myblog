const fs = require('fs');
const path = require('path');

const readfile = (file, isJson, cb) => {
    fs.readFile(file, {encoding: 'utf8'}, (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            try {
                if (isJson) {
                    cb(JSON.parse(data));
                }
                else {
                    cb(data);
                }
            }
            catch (ex) {
                console.error(ex);
            }
        }
    });
};

const info = (articleId, cb) => {
    readfile(path.resolve(__dirname, './article-list.db.json'), true, (db) => {
        const result = db.filter(item => {
            return item.articleId === articleId;
        });

        if (result.length > 0) {
            const info = result[0];

            readfile(path.resolve(__dirname, info.articleId + '.html'), false, (html) => {
                info.content = html;
                cb(null, info);
            });
        }
        else {
            cb({
                error: {
                    name: 'ERR_NO_ITEM',
                    message: '没有找到文章数据，文章ID:' + articleId
                }
            });
        }
    });
};

const list = (startIndex = 0, length = 10, category, cb) => {
    readfile(path.resolve(__dirname, 'article-list.db.json'), true, (db) => {
        let result = db;

        if (category) {
            result = result.filter(item => {
                const midValue = item.categories && item.categories.filter(categoryItem => {
                    return category === categoryItem.name;
                });

                return midValue.length > 0;
            });
        }

        if (startIndex >= 0) {
            result = result.slice(startIndex, startIndex + length);
        }

        cb(null, result);
    });
};

const changeComments = (articleId) => {
    readfile(path.resolve(__dirname, 'article-list.db.json'), true, (db) => {
        db.forEach(item => {
            if (item.articleId === articleId) {
                item.comments++;
            }
        });

        fs.writeFile(path.resolve(__dirname, 'article-list.db.json'), JSON.stringify(db, null, '    '), 'utf8', (err) => {
            if (err) {
                console.error(err);
            }
        });
    });
};

const routes = (cb) => {
    readfile(path.resolve(__dirname, 'article-list.db.json'), true, (db) => {
        cb(null, db.map(item => {
            return {
                articleId: item.articleId,
                url: item.url
            };
        }));
    });
};

module.exports = {
    list,
    info,
    routes,
    changeComments
};