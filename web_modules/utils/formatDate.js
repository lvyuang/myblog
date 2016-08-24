export default (ts) => {
    const date = new Date(ts);

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};