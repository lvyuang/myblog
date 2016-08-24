const fs = require('fs');
const path = require('path');
const readline = require('readline');
const article = require('../article');

const list = (articleId, cb) => {
    const list = [];

    readline.createInterface({
        input: fs
            .createReadStream(path.resolve(__dirname, `./${articleId}.db.txt`))
            .on('error', (err) => {
                // 没有找到评论文件，按无评论处理
                cb(null, []);
            })
    }).on('line', (line) => {
        try {
            list.unshift(JSON.parse(line));
        }
        catch (ex) {}
    }).on('close', () => {
        cb(null, list);
    })
};

const post = (articleId, user, createTime, content, quotation, cb) => {
    const data = {
        commentId: Date.now(),
        user,
        createTime,
        content,
        quotation
    };

    fs.appendFile(
        path.resolve(__dirname, `./${articleId}.db.txt`),
        JSON.stringify(data) + '\n',
        'utf8',
        (err) => {
            if (err) {
                cb({
                    error: err
                });
                return;
            }

            // 修改文章列表的评论数
            article.changeComments(articleId);

            cb(null);
        }
    );
};

module.exports = {
    list,
    post
};