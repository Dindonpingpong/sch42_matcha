import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: true,
    errMsg: 'test',
    isLogged: false,
    email: null,
    password: null,
    me: {}
}

export const LoginReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.LOGIN_ADD:
            return { ...state, isLoading: false, errMsg: 'cool', isLogged: true, me: action.payload };

        case ActionTypes.LOGIN_LOADING:
            return { ...state, isLoading: true, errMsg: 'load', isLogged: true, me: {} };

        case ActionTypes.LOGIN_FAILED:
            return { ...state, isLoading: false, errMsg: 'f', isLogged: true, me: {} };

        case ActionTypes.LOGIN_EMAIL_ADD:
            return { ...state, isLoading: true, errMsg: 'em', isLogged: false, me: {}, email: action.email };

        case ActionTypes.LOGIN_PASSWORD_ADD:
            return { ...state, isLoading: true, errMsg: 'pas', isLogged: false, me: {}, password: action.password };

        default:
            return state;
    }
}