import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: true,
    errMsg: null,
    nickname: null,
    firstname: null,
    lastname: null,
    datebirth: null,
    email: null,
    about: null,
    sex: null,
    sexpreferences: null,
    tags: null,
    newpass: null,
    coords: null,
    passwordStatus: false,
    editProfileStatus: null
};

export const EditProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.EDIT_PROFILE_STATUS_ADD:
            return { ...state, isLoading: false, errProfile: null, editProfileStatus: action.payload };

        case ActionTypes.PROFILE_EDIT_LOADING:
            return { ...state, isLoading: true, errProfile: null, editProfileStatus: null };

        case ActionTypes.PROFILE_EDIT_FAILED:
            return { ...state, isLoading: false, errProfile: action.payload, editProfileStatus: null };

        case ActionTypes.PROFILE_EDIT_CLEAR:
            return { ...initialState };

        case ActionTypes.NICKNAME_ADD:
            return { ...state, isLoading: false, errProfile: null, nickname: action.nickname };

        case ActionTypes.FIRSTNAME_ADD:
            return { ...state, isLoading: false, errProfile: null, firstname: action.firstname };

        case ActionTypes.LASTNAME_ADD:
            return { ...state, isLoading: false, errProfile: null, lastname: action.lastname };

        case ActionTypes.DATEBIRTH_ADD:
            return { ...state, isLoading: false, errProfile: null, datebirth: action.datebirth };

        case ActionTypes.EMAIL_ADD:
            return { ...state, isLoading: false, errProfile: null, email: action.email };

        case ActionTypes.ABOUT_ADD:
            return { ...state, isLoading: false, errProfile: null, about: action.about };

        case ActionTypes.SEX_ADD:
            return { ...state, isLoading: false, errProfile: null, sex: action.sex };

        case ActionTypes.SEXPREFERENCES_ADD:
            return { ...state, isLoading: false, errProfile: null, sexpreferences: action.sexpreferences };

        case ActionTypes.TAGS_ADD:
            return { ...state, isLoading: false, errProfile: null, tags: action.tags };

        case ActionTypes.COORDS_ADD:
            return { ...state, isLoading: false, errProfile: null, coords: action.coords };

        case ActionTypes.NEWPASSWORD_ADD:
            return { ...state, isLoading: false, errProfile: null, newpass: action.newpass };

        case ActionTypes.PASSWORD_STATUS_ADD:
            return { ...state, isLoading: false, errProfile: null, passwordStatus: action.passwordStatus };

        default:
            return state;
    }
}
