const isValidPassword = (value) => {
    if (value.length > 0)
        return true;
    return false;
}

const isValidInput = (type, value) => {
    let regex;

    if (type === 'dateBirth') {
        let tmp = value.split('-');
        let birthday = new Date(tmp[0], tmp[1] - 1, tmp[2]);
        let ageDiffMs = Date.now() - birthday.getTime;
        let age = Math.abs(new Date(ageDiffMs).getUTCFullYear - 1970);

        if (age < 18)
            return false;
        return true;
    }

    switch (type) {
        case 'Email':
            regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            break;
        case 'Login':
            regex = /^[A-zА-я0-9]+$/;
            break;
        default:
            regex = /^[A-zА-я]+$/;
    }

    if (value.match(regex))
        return true;
    return false;
}

exports.isValidPassword = isValidPassword;
exports.isValidInput = isValidInput;
