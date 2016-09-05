const service = require('./routes/services/article');

service.post(
    'test',
    'test title',
    'TEST SUBTITLE',
    Date.now(),
    'This is a desc',
    'test-url',
    [{categoryId: 'webpack', categoryName: '阿宝工具'}],
    '<p>hei hei hei</p>',
    (err, res) => {
        console.log(err, res);
    }
);

// service.remove('test', (err, res) => {
//     console.log(err, res);
// });