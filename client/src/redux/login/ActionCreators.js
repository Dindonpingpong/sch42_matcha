import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';

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

export const loginNicknameAdd = (login) => ({
    type: ActionTypes.LOGIN_NICKNAME_ADD,
    nickname: login
});

export const loginPasswordAdd = (password) => ({
    type: ActionTypes.LOGIN_PASSWORD_ADD,
    password: password
});

export const loginOut = () => ({
    type: ActionTypes.LOG_OUT
})

export const fetchLogin = (login, password) => (dispatch) => {
    dispatch(loginLoading());

    const data = {
        login: login,
        password: password
    }

    return request('/api/user/login', data, 'POST')
        .then(res => res.json())
        .then(result => {
            if (result.success === true) {
                dispatch(loginAdd(result.profile));
            }
            else {
                dispatch(loginFailed(result.message));
            }
        })
        .catch(error => dispatch(loginFailed(error.message)));
}

export const fetchUpdateLogin = (login) => (dispatch) => {
    dispatch(loginLoading());

    return request(`/api/user/login/${login}`)
        .then(res => res.json())
        .then(result => {
            if (result.success === true) {
                console.log(result);
                dispatch(loginAdd(result.profile));
            }
            else {
                dispatch(loginFailed(result.message));
            }
        })
        .catch(error => dispatch(loginFailed(error.message)));
}

export const setLogin = (login) => (dispatch) => {
    return dispatch(loginNicknameAdd(login));
}

export const setPassword = (password) => (dispatch) => {
    return dispatch(loginPasswordAdd(password));
}

export const logOut = () => (dispatch) => {
    return dispatch(loginOut());
}