const path = require('path');
const express = require('express');
const routes = require('./routes/root.js');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use('/', express.static(path.resolve(process.cwd(), 'build')));

routes(app);

app.listen(3000, () => {
    console.log('Server started, listening on port: 3000.');
});