const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');

module.exports = (app) => {
    app.use(favicon(path.resolve(process.cwd(), 'resources/favicon.ico')));

    // 解析post请求
    app.use(bodyParser.json({limit: '25mb'}));
    app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));

    // 加载文章路由
    const articleRoutes = require('./data/article/article-list.db.json');

    articleRoutes.forEach(item => {
        app.get(item.url + '*', (req, res, next) => {
            if (req.headers['user-agent'].toLowerCase().match(/baiduspider|googlebot/)) {
                res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8" />
                            <title>吕权的个人网站</title>
                            <meta content="吕权,个人网站,前端开发,SPA,摄影,生活方式" name="Keywords">
                            <meta name="description" content="分享、交流前端技术，讨论兴趣爱好，结识志同道合的朋友。">
                        </head>
                        <body>
                            <h1>${item.title}</h1>
                            <h2>${item.subtitle}</h2>
                            <article>${item.desc}</article>
                        </body>
                    </html>
                `);
            }
            else {
                next();
            }
        });
    });

    app.use('/', express.static(path.resolve(process.cwd(), 'build')));
    app.use('/resources', express.static(path.resolve(process.cwd(), 'resources')));

    app.use(require('./article.js'));
};