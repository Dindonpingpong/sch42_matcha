import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: true,
    errMsg: null,
    isLogged: false,
    me: {}
}

export const LoginReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ActionTypes.LOGIN_ADD:
            return { ...state, isLoading: false, errMsg: null, isLogged: true ,me: action.payload };

        case ActionTypes.LOGIN_LOADING:
            return { ...state, isLoading: true, errMsg: null, isLogged: false ,me: {} };

        case ActionTypes.LOGIN_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload, iisLogged: false ,me: {} };

        default:
            return state;
    }
}