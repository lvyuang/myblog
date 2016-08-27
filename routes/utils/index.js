const fs = require('fs-extra');

const readfile = (file, isJson, cb) => {
    fs.readFile(file, {encoding: 'utf8'}, (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            try {
                if (isJson) {
                    cb(JSON.parse(data));
                }
                else {
                    cb(data);
                }
            }
            catch (ex) {
                console.error(ex);
            }
        }
    });
};

const readfileSync = (file, isJson) => {
    try {
        const data = fs.readFileSync(file, {encoding: 'utf8'});

        if (isJson) {
            return JSON.parse(data);
        }
        else {
            return data;
        }
    }
    catch (ex) {
        console.error(ex);
    }
};

const dateFormat = (ts) => {
    const date = new Date(ts);

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

module.exports = {
    readfile,
    readfileSync,
    dateFormat
};