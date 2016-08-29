module.exports = (err) => {
    console.error(err);

    return {
        error: {
            name: err.name,
            message: err.message
        }
    };
};