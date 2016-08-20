import fetch from 'isomorphic-fetch';

const encodeRequestParams = (params) => {
    if (!params) {
        return null;
    }

    return Object
        .keys(params)
        .reduce((next, key) => {
            if (params[key] === null || params[key] === undefined) {
                return next;
            }

            if (next.length > 0) {
                next.push('&');
            }

            next.push(encodeURIComponent(key) + '=' + encodeURIComponent(
                Array.isArray(params[key]) ? JSON.stringify(params[key]) : params[key]
            ));

            return next;
        }, [])
        .join('')
        .replace(/%20/g, '+');
};

const createErrorObject = (params) => {
    const err = new Error();
    err.status = params.status;
    err.statusText = params.statusText;
    err.headers = params.headers;
    err.url = params.url;
    err.message = params.statusText;

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
            if (res.status >= 400) {
                throw createErrorObject({
                    status: res.status,
                    statusText: res.statusText,
                    headers: res.headers,
                    url: res.url,
                    message: res.message
                });
            }
            else {
                return res.json();
            }
        });
    }
    else {
        promise = fetch(url + (!params ? '' : '?' + encodeRequestParams(params)), {
            method: method.toUpperCase(),
            credentials: 'same-origin'
        }).then(res => {
            if (res.status >= 400) {
                throw createErrorObject({
                    status: res.status,
                    statusText: res.statusText,
                    headers: res.headers,
                    url: res.url,
                    message: res.message
                });
            }
            else {
                return res.json();
            }
        });
    }

    return promise;
};