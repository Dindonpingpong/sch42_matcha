"use strict";

(function() {
    let inputs = $('input');

    function validateRegexp(value, pattern, flags) {
        let re = new RegExp(pattern, flags);

        return re.test(value);
    }



    function checkInput(input) {
        let value = input.value;
        let validator = input.validator;

        switch (validator) {
            case 'letters':
                return validateRegexp(value, '^[a-zа-яё]+$', 'i');
            case 'email':
                return validateEmail(value);
            case 'passwd':
                    return validatePasswd(value);
            case 'repass':
                {
                    let pass = $('form-row:last-child input').value;
                    if (pass != value)
                        input.classList.add()

                }
            default:
                return true;
        }
    }

    $('button').click(function(event) {
        event.preventDefault();

        inputs.forEach(element => {
            checkInput(element);
        });
    });
})();