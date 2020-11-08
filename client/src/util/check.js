const isValidPassword = (value) => {
    return (value.length > 0);
    // if (value.length > 0)
    //     return true;
    // return false;
}

const isValidInput = (type, value) => {
    let regex;

    if (type === 'birthDate') {
        let tmp = value.split('-');
        let birthDate = new Date(tmp[0], tmp[1] - 1, tmp[2]);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
            age--;

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

        case 'newPass':
            return (value.length > 0);

        case 'rePass':
            return (value.length > 0);

        case 'currentPass':
            return (value.length > 0);

        case 'bio':
            return (value.length < 80);

        default:
            regex = /^[A-zА-я]+$/;
    }

    if (value.match(regex))
        return true;
    return false;
}

exports.isValidPassword = isValidPassword;
exports.isValidInput = isValidInput;
