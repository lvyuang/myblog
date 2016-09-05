const dateFormat = (ts) => {
    const date = new Date(parseInt(ts));

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const datetimeFormat = (ts) => {
    const date = new Date(parseInt(ts));

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

module.exports = {
    dateFormat,
    datetimeFormat
};