const path = require('path');
const express = require('express');
const routes = require('./routes/root.js');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const app = express();
app.use(morgan('dev'));
app.use(compression());
app.use(cookieParser());
routes(app);

app.listen(3000, () => {
    console.log('Server started, listening on port: 3000.');
});