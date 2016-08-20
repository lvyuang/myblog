const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');
const routes = require('./routes/root.js');
const bodyParser = require('body-parser');

const host = 'localhost';
const port = 3000;

// WebpackDevServer host and port, "only" prevents reload on syntax errors
webpackConfig.entry.root.unshift(`webpack-dev-server/client?http://${host}:${port}/`, 'webpack/hot/only-dev-server');

// js or jsx can be hot reloaded
webpackConfig.module.loaders.forEach(item => {
    if (item.loader === 'babel') {
        delete item.loader;
        item.loaders = ['react-hot', 'babel'];
    }
});

// add hot loading plugin
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

// config & start dev server
const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    contentBase: path.resolve(process.cwd(), 'build'),
    hot: true,
    historyApiFallback: {
        index: '/'
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    colors: true,
    setup: function (app) {
        // 解析post请求
        app.use(bodyParser.json({limit: '25mb'}));
        app.use(bodyParser.urlencoded({limit: '25mb', extended: true}));

        // 路由管理
        routes(app);
    },
    stats: {
        colors: true,
        version: false,
        chunks: false,
        chunkModules: false
    }
});
server.listen(port, host, function () {
    console.log(`Server started listening at ${port}.`);
});