import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';

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

export const viewAdd = (views) => ({
    type: ActionTypes.VIEW_ADD,
    payload: views.result
});

export const viewFailed = (msg) => ({
    type: ActionTypes.VIEW_FAILED,
    payload: msg
});

export const fetchView = (nickname) => (dispatch) => {
    dispatch(profileLoading());

    return request('/api/user/views/' + nickname)
        .then(response => response.json())
        .then(result => dispatch(viewAdd(result)))
        .catch(error => dispatch(viewFailed(error.message)));
};

export const likeAdd = (likes) => ({
    type: ActionTypes.LIKE_ADD,
    payload: likes.result
});

export const likeFailed = (msg) => ({
    type: ActionTypes.LIKE_FAILED,
    payload: msg
});

export const fetchLike = (nickname) => (dispatch) => {
    dispatch(profileLoading());

    return request('/api/user/likes/' + nickname)
        .then(response => response.json())
        .then(result => dispatch(likeAdd(result)))
        .catch(error => dispatch(likeFailed(error.message)));
};