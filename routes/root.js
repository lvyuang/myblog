const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

module.exports = (app) => {
    // 解析post请求
    app.use(bodyParser.json({limit: '25mb'}));
    app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));

    app.use('/', express.static(path.resolve(process.cwd(), 'build')));
    app.use('/resources', express.static(path.resolve(process.cwd(), 'resources')));

    app.use(require('./article.js'));
};