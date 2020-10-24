import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';

export const editProfileStatus = (status) => ({
    type: ActionTypes.EDIT_PROFILE_STATUS_ADD,
    payload: status.result
});

export const editProfileLoading = () => ({
    type: ActionTypes.PROFILE_EDIT_LOADING
});

export const editProfileFailed = (msg) => ({
    type: ActionTypes.PROFILE_EDIT_FAILED,
    payload: msg
});

export const editNicknameAdd = (nickname) => ({
    type: ActionTypes.NICKNAME_ADD,
    nickname: nickname
});

export const editFirstnameAdd = (firstname) => ({
    type: ActionTypes.FIRSTNAME_ADD,
    firstname: firstname
});

export const editLastnameAdd = (lastname) => ({
    type: ActionTypes.LASTNAME_ADD,
    lastName: lastname
});

export const editDatebirthAdd = (datebirth) => ({
    type: ActionTypes.DATEBIRTH_ADD,
    datebirth: datebirth
});

export const editEmailAdd = (email) => ({
    type: ActionTypes.EMAIL_ADD,
    email: email
});

export const editAboutAdd = (about) => ({
    type: ActionTypes.ABOUT_ADD,
    about: about
});

export const editSexAdd = (sex) => ({
    type: ActionTypes.SEX_ADD,
    sex: sex
});

export const editSexpreferenceAdd = (sexpreference) => ({
    type: ActionTypes.SEXPREFERENCES_ADD,
    sexpreference: sexpreference
});

export const editTagsAdd = (tags) => ({
    type: ActionTypes.TAGS_ADD,
    tags: tags
});

export const editPasswordStatusAdd = (status) => ({
    type: ActionTypes.PASSWORD_STATUS_ADD,
    status: status
});

export const fetchEditProfile = (nickname) => (dispatch) => {
    dispatch(editProfileLoading());

    return request('/api/user/' + nickname)
        .then(response => response.json())
        .then(result => dispatch(editProfileStatus(result)))
        .catch(error => dispatch(editProfileFailed(error.message)));
};
