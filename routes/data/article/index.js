const fs = require('fs');
const path = require('path');

const info = (articleId, cb) => {
    const db = require('./article-list.db.json');

    const result = db.filter(item => {
        return item.articleId === articleId;
    });

    if (result.length > 0) {
        const info = result[0];

        info.content = require('./' + info.articleId + '.html.js');

        cb(null, info);
    }
    else {
        cb({
            error: {
                name: 'ERR_NO_ITEM',
                message: '没有找到文章数据，文章ID:' + articleId
            }
        });
    }
};

const list = (startIndex = 0, length = 10, category, cb) => {
    const db = require('./article-list.db.json');
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
};

const changeComments = (articleId) => {
    const db = require('./article-list.db.json');

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
};

const routes = (cb) => {
    const db = require('./article-list.db.json');

    cb(null, db.map(item => {
        return {
            articleId: item.articleId,
            url: item.url
        };
    }));
};

module.exports = {
    list,
    info,
    routes,
    changeComments
};