const request = (url, data = [], method = 'GET') => {
    const requestOptions = {
        method: method,
        headers: { 
            'Content-Type': 'application/json'
         },
    };

    if (method === 'POST')
        requestOptions.body = JSON.stringify(data);

    return fetch(url, requestOptions)
}

exports.request = request;