import * as ActionTypes from './ActionTypes';
import { request } from '../util/http';

export const profileLoading = () => ({
    type: ActionTypes.PROFILE_LOADING
});

export const profileAdd = (info) => ({
    type: ActionTypes.PROFILE_ADD,
    payload: info.result
});

export const profileFailed = (msg) => ({
    type: ActionTypes.PROFILE_FAILED,
    payload: msg
});

export const fetchProfile = (nickname) => (dispatch) => {
    dispatch(profileLoading());

    return request('/api/user/' + nickname)
        .then(response => response.json())
        .then(result => dispatch(profileAdd(result)))
        .catch(error => dispatch(profileFailed(error.message)));
};

export const loginLoading = () => ({
    type: ActionTypes.LOGIN_LOADING
});

export const loginAdd = (info) => ({
    type: ActionTypes.LOGIN_ADD,
    payload: info
});

export const loginFailed = (msg) => ({
    type: ActionTypes.LOGIN_FAILED,
    payload: msg
});

export const loginEmailAdd = (email) => ({
    type: ActionTypes.LOGIN_EMAIL_ADD,
    email: email
})

export const loginPasswordAdd = (password) => ({
    type: ActionTypes.LOGIN_PASSWORD_ADD,
    password: password
})

export const fetchLogin = (email, password) => (dispatch) => {
    dispatch(loginLoading());

    const data = {
        email: email,
        password: password
    }

    return request('/api/user/login', data, 'POST')
        .then(res => res.json())
        .then( result => {
            if (result.success === true) {
                dispatch(loginAdd(result.profile))
            }
            else {
                dispatch(loginFailed(result.message))
            }
        })
        .catch(error => dispatch(loginFailed(error.message)));
}

export const setEmail = (email) => (dispatch) => {
    return dispatch(loginEmailAdd(email));
}

export const setPassword = (password) => (dispatch) => {
    return dispatch(loginPasswordAdd(password));
}