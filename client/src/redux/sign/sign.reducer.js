import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: false,
    errMsg: null,
    success: null,
    firstName: null,
    lastName: null,
    nickName: null,
    email: null,
    sex: 'female',
    password: null,
    repassword: null,
    dateBirth: null
}

export const SignReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.USER_FORM_LOADING:
            return { ...state, isLoading: true, errMsg: action.message };

        case ActionTypes.USER_FORM_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload };

        case ActionTypes.USER_FORM_FIRSTNAME_ADD:
            return { ...state, isLoading: false, errMsg: null, firstName: action.firstName };

        case ActionTypes.USER_FORM_LASTNAME_ADD:
            return { ...state, isLoading: false, errMsg: null, lastName: action.lastName };

        case ActionTypes.USER_FORM_NICKNAME_ADD:
            return { ...state, isLoading: false, errMsg: null, nickName: action.nickName };

        case ActionTypes.USER_FORM_EMAIL_ADD:
            return { ...state, isLoading: false, errMsg: null, email: action.email };

        case ActionTypes.USER_FORM_SEX_ADD:
            return { ...state, isLoading: false, errMsg: null, sex: action.sex };

        case ActionTypes.USER_FORM_PASSWORD_ADD:
            return { ...state, isLoading: false, errMsg: null, password: action.password };

        case ActionTypes.USER_FORM_REPASSWORD_ADD:
            return { ...state, isLoading: false, errMsg: null, repassword: action.repassword };

        case ActionTypes.USER_FORM_DATE_ADD:
            return { ...state, isLoading: false, errMsg: null, dateBirth: action.dateBirth };

        case ActionTypes.USER_FORM_SUBMIT:
            return { ...initialState, success: action.payload };

        default:
            return state;
    }
}
