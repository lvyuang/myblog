const client = require('../routes/db');

const success = (res) => {
    console.log(res);
};

const failure = (err) => {
    console.error(err);
};

client.flushdbAsync().then(res => {
    client.batch([
        [
            'hmset', 'article:hello-world',
            'articleId', 'hello-world',
            'title', 'Hello World',
            'subtitle', 'Welcome to hello world!',
            'createTime', 1472793910600,
            'desc', 'This is a non-sense description.',
            'url', 'the-hello-world'
        ],
        [
            'rpush', 'article:hello-world:categories',
            'sample', 'text'
        ],
        [
            'set', 'article:hello-world:content',
            '<p>Set key to hold the string value. If key already holds a value, it is overwritten, regardless of its type. Any previous time to live associated with the key is discarded on successful SET operation.</p>'
        ],
        [
            'hmset', 'article:day1',
            'articleId', 'day1',
            'title', 'The DAY 1',
            'subtitle', 'Monday is a sunny day.',
            'createTime', 1472793920600,
            'desc', 'After monday is tuesday.',
            'url', 'the-day-1'
        ],
        [
            'rpush', 'article:day1:categories',
            'text'
        ],
        [
            'set', 'article:day1:content',
            '<p>Eat Wash Run Jump</p>'
        ],
        [
            'hmset', 'article:day2',
            'articleId', 'day2',
            'title', 'The DAY TWO',
            'subtitle', '2 is a good number.',
            'createTime', 1472794920600,
            'desc', 'I love 2.',
            'url', '222'
        ],
        [
            'set', 'article:day2:content',
            '<p>The TWO<br/>OH OOOO~</p>'
        ],
        [
            'zadd', 'article-list',
            1472793910600, 'hello-world',
            1472793920600, 'day1',
            1472794920600, 'day2'
        ],
        [
            'zadd', 'article-list:sample',
            1472793910600, 'hello-world'
        ],
        [
            'zadd', 'article-list:text',
            1472793910600, 'hello-world',
            1472793920600, 'day1'
        ],
        [
            'sadd', 'category-list',
            'sample', 'text'
        ],
        [
            'hmset', 'category:sample',
            'categoryId', 'sample',
            'categoryName', '例子'
        ],
        [
            'hmset', 'category:text',
            'categoryId', 'text',
            'categoryName', '文本'
        ],
        [
            'zadd', 'comment-list:hello-world',
            1472793910601, '1',
            1472793910602, '2'
        ],
        [
            'zadd', 'comment-list:day1',
            1472793910603, '3'
        ],
        [
            'hmset', 'comment:1',
            'commentId', 1,
            'user', 'bob',
            'createTime', 1472793910601,
            'content', 'It\'s valueable'
        ],
        [
            'hmset', 'comment:2',
            'commentId', 2,
            'user', 'tom',
            'createTime', 1472793910602,
            'content', 'Me too.',
            'quotationUser', 'bob',
            'quotationContent', 'It\'s valueable'
        ],
        [
            'hmset', 'comment:3',
            'commentId', 3,
            'user', 'bob',
            'createTime', 1472793910603,
            'content', 'I like monday!'
        ],
        [
            'zadd', 'user-list',
            1472792910600, 'bob',
            1472792910601, 'tom'
        ],
        [
            'hmset', 'user:bob',
            'userId', 'bob',
            'password', '123'
        ],
        [
            'hmset', 'user:tom',
            'userId', 'tom',
            'password', '456'
        ],
        [
            'hmset', 'session-list',
            'a7e912', 'tom',
            'tom', 'a7e912',
            'b231d1', 'bob',
            'bob', 'b231d1'
        ],
        [
            'set', 'comment-id', '3'
        ]
    ]).execAsync().then(success).catch(failure);
}).catch(failure);
