const express = require('express');
const router = express.Router();
const path = require('path');
const serviceLog = require('./services/log');

/**
    获取文章列表
    GET: /api/log/access
    PARAMS:
        url: {String}
    RETURNS:
        {
            ok: true
        }
 */
router.get('/api/log/access', (req, res) => {
    serviceLog.access(req);

    res.json({ok: true});
});

module.exports = router;