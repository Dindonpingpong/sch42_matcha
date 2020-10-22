const request = (url, data = [], method = 'GET', header = 'application/json') => {
    const requestOptions = {
        method: method,
        headers: { 
            'Content-Type': header,
        }
    };

    if (method === 'POST')
        requestOptions.body = data;

    return fetch(url, requestOptions)
}

exports.request = request;