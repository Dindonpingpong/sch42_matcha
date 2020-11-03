import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';

export const editProfileStatus = (status) => ({
    type: ActionTypes.EDIT_PROFILE_STATUS_ADD,
    payload: status.result
});

export const editProfileLoading = () => ({
    type: ActionTypes.PROFILE_EDIT_LOADING
});

export const editProfileClear = () => ({
    type: ActionTypes.PROFILE_EDIT_CLEAR
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
    lastname: lastname
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
    sexpreferences: sexpreference
});

export const editTagsAdd = (tags) => ({
    type: ActionTypes.TAGS_ADD,
    tags: tags
});

export const editCoordsAdd = (coords) => ({
    type: ActionTypes.COORDS_ADD,
    coords: coords
});

export const editNewpassAdd = (newpass) => ({
    type: ActionTypes.NEWPASSWORD_ADD,
    newpass: newpass
});

export const editPasswordStatusAdd = (status) => ({
    type: ActionTypes.PASSWORD_STATUS_ADD,
    status: status
});

export const setLogin = (login) => (dispatch) => {
    dispatch(editNicknameAdd(login));
};

export const setFirstName = (firstName) => (dispatch) => {
    dispatch(editFirstnameAdd(firstName));
};

export const setLastName = (lastName) => (dispatch) => {
    dispatch(editLastnameAdd(lastName));
};

export const setDate = (date) => (dispatch) => {
    dispatch(editDatebirthAdd(date));
};

export const setEmail = (email) => (dispatch) => {
    dispatch(editEmailAdd(email));
};

export const setAbout = (date) => (dispatch) => {
    dispatch(editAboutAdd(date));
};

export const setSex = (sex) => (dispatch) => {
    dispatch(editSexAdd(sex));
};

export const setSexPref = (sexpref) => (dispatch) => {
    dispatch(editSexpreferenceAdd(sexpref));
};

export const setTags = (tags) => (dispatch) => {
    dispatch(editTagsAdd(tags));
};

export const setCoords = (coords) => (dispatch) => {
    dispatch(editCoordsAdd(coords));
};

export const setNewPassword = (pass) => (dispatch) => {
    dispatch(editNewpassAdd(pass));
};

export const initFormEdit = () => (dispatch) => {
    dispatch(editProfileClear());
};

export const fetchEditProfile = (data, login) => (dispatch) => {
    dispatch(editProfileLoading());

    return request(`/api/user/edit/tags/${login}`, data, 'POST')
        .then(response => response.json())
        .then((res) => {
            console.log(res);
            if (res.success) {
                request(`api/user/edit/location/${login}`, data, 'POST')
                    .then(response => response.json())
                    .then((res) => {
                        if (res.success) {
                            request(`/api/user/edit/${login}`, data, 'POST')
                                .then(response => response.json())
                                .then(result => dispatch(editProfileStatus(result)))
                                .catch(error => dispatch(editProfileFailed(error.message)));
                        }
                    })
                    .catch(error => dispatch(editProfileFailed(error.message)));
            }
        })
        .catch(error => dispatch(editProfileFailed(error.message)));
};

