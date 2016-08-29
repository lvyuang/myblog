const fs = require('fs-extra');
const _readline = require('readline');

const readfile = (file, isJson, defaultValue, cb) => {
    fs.readFile(file, {encoding: 'utf8'}, (err, data) => {
        if (err) {
            cb(null, defaultValue);
        }
        else {
            if (!data) {
                data = defaultValue;
            }

            try {
                if (isJson) {
                    cb(null, (typeof(data) === 'string') ? JSON.parse(data) : data);
                }
                else {
                    cb(null, data);
                }
            }
            catch (ex) {
                cb(ex);
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
        throw ex;
    }
};

const readline = (filename, cb) => {
    const list = [];

    _readline.createInterface({
        input: fs
            .createReadStream(
                path.resolve(filename)
            )
            .on('error', (err) => {
                cb(null, []);
            })
    }).on('line', (line) => {
        try {
            list.unshift(JSON.parse(line));
        }
        catch (ex) {}
    }).on('close', () => {
        cb(null, list);
    });
};

const dateFormat = (ts) => {
    const date = new Date(ts);

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

module.exports = {
    readfile,
    readfileSync,
    readline,
    dateFormat
};