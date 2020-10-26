import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: true,
    errMsg: null,
    isLogged: false,
    nickname: null,
    password: null,
    me: {}
}

export const LoginReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.LOGIN_ADD:
            return { ...state, isLoading: false, errMsg: null, isLogged: true, password: null, me: action.payload };
        
        case ActionTypes.LOG_OUT:
            return { ...initialState };

        case ActionTypes.LOGIN_LOADING:
            return { ...state, isLoading: true, errMsg: null };

        case ActionTypes.LOGIN_FAILED:
            return { ...state, isLoading: false, errMsg: 'Failed', isLogged: false, me: {} };

        case ActionTypes.LOGIN_NICKNAME_ADD:
            return { ...state, isLoading: true, errMsg: null, isLogged: false, nickname: action.nickname };

        case ActionTypes.LOGIN_PASSWORD_ADD:
            return { ...state, isLoading: true, errMsg: null, isLogged: false, password: action.password };

        default:
            return state;
    }
}