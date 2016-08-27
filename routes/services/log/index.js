const fs = require('fs-extra');
const path = require('path');

function getTimeString(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}#${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const access = (req) => {
    const date = new Date();

    // log format:
    // 2016-8-26_12:38:22 102.38.48.11 username user_agent http://www.lvquan.me/article
    const time = getTimeString(date);
    const ip = req.ip;
    const user = req.cookies && req.cookies.user;
    const ua = req.headers['user-agent'].replace(/\s/g, '#');
    const url = decodeURIComponent(req.data.url);

    // file format:
    // logs/access/2016/8/25.log
    const logDir = path.resolve(
        process.cwd(),
        'logs',
        'access',
        date.getFullYear().toString(),
        (date.getMonth() + 1).toString()
    );
    const logFile = path.resolve(
        logDir,
        date.getDate() + '.log'
    );
    const logContent = `${time} ${ip} ${user} ${ua} ${url}\n`;

    fs.ensureFile(logFile, (err) => {
        if (err) {
            console.error(err);
        }
        else {
            fs.appendFileSync(logFile, logContent);
        }
    });
};

module.exports = {
    access,
    error: () => {}
};