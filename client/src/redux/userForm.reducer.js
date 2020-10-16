import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: true,
    errMsg: null,
    success: false,
    firstName: null,
    lastName: null,
    nickName: null,
    email: null,
    password: null,
    repassword: null,
    dateBirth: null,
    location: [],
    tags: [],
    sex: null,
    sexPreference: null
}

export const UserFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.USER_FORM_LOADING:
            return { ...state, isLoading: false, errMsg: action.message };

        case ActionTypes.USER_FORM_FIRSTNAME_ADD:
            return { ...state, isLoading: false, errMsg: null, firstName: action.firstName };

        case ActionTypes.USER_FORM_LASTNAME_ADD:
            return { ...state, isLoading: false, errMsg: null, lastName: action.lastName };

        case ActionTypes.USER_FORM_NICKNAME_ADD:
            return { ...state, isLoading: false, errMsg: null, nickName: action.login };

        case ActionTypes.USER_FORM_EMAIL_ADD:
            return { ...state, isLoading: false, errMsg: null, email: action.email };

        case ActionTypes.USER_FORM_PASSWORD_ADD:
            return { ...state, isLoading: false, errMsg: null, password: action.password };

        case ActionTypes.USER_FORM_REPASSWORD_ADD:
            return { ...state, isLoading: false, errMsg: null, repassword: action.repassword };

        case ActionTypes.USER_FORM_DATE_ADD:
            return { ...state, isLoading: false, errMsg: null, dateBirth: action.dateBirth };

        case ActionTypes.USER_FORM_LOCATION_ADD:
            return { ...state, isLoading: false, errMsg: null, location: action.location };

        case ActionTypes.USER_FORM_TAGS_ADD:
            return { ...state, isLoading: false, errMsg: null, tags: action.location };

        case ActionTypes.USER_FORM_SEX_ADD:
            return { ...state, isLoading: false, errMsg: null, sex: action.sex };

        case ActionTypes.USER_FORM_SEX_PREFERENCE_ADD:
            return { ...state, isLoading: false, errMsg: null, sexPreference: action.sexPreference };

        case ActionTypes.USER_FORM_SUBMIT_EDIT:
            return { ...initialState, success: action.payload };

        default:
            return state;
    }
}
