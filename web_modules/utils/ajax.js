import fetch from 'isomorphic-fetch';

const encodeRequestParams = (params) => {
    if (!params) {
        return null;
    }

    return 'data=' + encodeURIComponent(JSON.stringify(params));
};

const createErrorObject = (name, message) => {
    const err = new Error(message);
    err.name = name;

    return err;
};

export default (options) => {
    const {url, method = 'get', params} = options;
    let promise;

    if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') {
        promise = fetch(
            url, {
                method: method.toUpperCase(),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: encodeRequestParams(params || {}),
                credentials: 'same-origin'
            }
        ).then(res => {
            return res.json();
        }).then(result => {
            if (result.error) {
                throw createErrorObject(result.error.name, result.error.message);
            }
            else {
                return result;
            }
        });
    }
    else {
        promise = fetch(url + (!params ? '' : '?' + encodeRequestParams(params)), {
            method: method.toUpperCase(),
            credentials: 'same-origin'
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.error) {
                throw createErrorObject(result.error.name, result.error.message);
            }
            else {
                return result;
            }
        });
    }

    return promise;
};