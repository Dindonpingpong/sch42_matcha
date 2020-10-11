const isValidName = (value) => {
    const letters = /^[A-Za-z]+$/;
    if (value.match(letters))
        return true;
    return false;
}

const isValidEmail= (value) => {
    const letters = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (value.match(letters))
        return true;
    return false;
}

const isValidPassword = (value) => {
    if (value.length > 7)
        return true;
    return false;
}

exports.isValidName = isValidName;
exports.isValidEmail = isValidEmail;
exports.isValidPassword = isValidPassword;