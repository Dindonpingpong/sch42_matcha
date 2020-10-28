const request = (url, data = [], method = 'GET', type = '') => {
    const requestOptions = {
        method: method
    };

    if (type !== 'image')
        requestOptions.headers = {
            'Content-Type': 'application/json'
        };
    else
        requestOptions.body = data;

    if (method === 'POST' && type !== 'image')
        requestOptions.body = JSON.stringify(data);

    return fetch(url, requestOptions)
}

exports.request = request;
