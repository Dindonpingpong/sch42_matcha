import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';

export const formLoading = () => ({
    type: ActionTypes.USER_FORM_LOADING
});

export const formFailed = (message) => ({
    type: ActionTypes.USER_FORM_FAILED,
    payload: message
});

export const formSubmit = (res) => ({
    type: ActionTypes.USER_FORM_SUBMIT,
    payload: res
});

export const formFirstName = (firstName) => ({
    type: ActionTypes.USER_FORM_FIRSTNAME_ADD,
    firstName: firstName
});

export const formLogin = (login) => ({
    type: ActionTypes.USER_FORM_NICKNAME_ADD,
    nickName: login
});

export const formLastName = (lastName) => ({
    type: ActionTypes.USER_FORM_LASTNAME_ADD,
    lastName: lastName
});

export const formEmail = (email) => ({
    type: ActionTypes.USER_FORM_EMAIL_ADD,
    email: email
});

export const formPassword = (pass) => ({
    type: ActionTypes.USER_FORM_PASSWORD_ADD,
    password: pass
});

export const formRepassword = (pass) => ({
    type: ActionTypes.USER_FORM_REPASSWORD_ADD,
    repassword: pass
});

export const formDate = (date) => ({
    type: ActionTypes.USER_FORM_DATE_ADD,
    dateBirth: date
});

export const setFirstName = (firstName) => (dispatch) => {
    dispatch(formFirstName(firstName));
};

export const setLogin = (login) => (dispatch) => {
    dispatch(formLogin(login));
};

export const setLastName = (lastName) => (dispatch) => {
    dispatch(formLastName(lastName));
};

export const setEmail = (email) => (dispatch) => {
    dispatch(formEmail(email));
};

export const setPassword = (pass) => (dispatch) => {
    dispatch(formPassword(pass));
};

export const setRepassword = (pass) => (dispatch) => {
    dispatch(formRepassword(pass));
};

export const setDate = (date) => (dispatch) => {
    dispatch(formDate(date));
};

export const fetchRegister = (data) => (dispatch) => {
    dispatch(formLoading());

    return request('/api/user/register', data, 'POST')
        .then(res => res.json())
        .then( result => {
            if (result.success === true) {
                dispatch(formSubmit());
            }
            else {
                dispatch(formFailed(result.message))
            }
        })
        .catch(error => dispatch(formFailed(error.message)));
}
