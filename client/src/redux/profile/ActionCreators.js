import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';
import { socket } from "../../util/socket";

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

    return request('/api/user/profile/' + nickname)
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

    return request('/api/user/profile/views/' + nickname)
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

    return request('/api/user/profile/likes/' + nickname)
        .then(response => response.json())
        .then(result => dispatch(likeAdd(result)))
        .catch(error => dispatch(likeFailed(error.message)));
};

export const statusAdd = (status) => ({
    type: ActionTypes.STATUS_ADD,
    payload: status.result
});

export const statusFailed = (msg) => ({
    type: ActionTypes.STATUS_FAILED,
    payload: msg
});

export const fetchStatus = (me, you) => (dispatch) => {
    dispatch(profileLoading());

    const data = {
        me: me,
        you: you
    }

    return request('/api/user/profile/status', data, 'POST')
        .then(response => response.json())
        .then(result => dispatch(statusAdd(result)))
        .catch(error => dispatch(statusFailed(error.message)));
};

export const fetchUpdateStatus = (me, you, status, newStatus) => (dispatch) => {
    dispatch(profileLoading());

    const data = {
        me: me,
        you: you,
        status: status,
        newStatus: newStatus
    }

    return request('/api/user/profile/status/update', data, 'POST')
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Ok') {
                dispatch(statusAdd(result));
                data.newStatus = result.data;
                socket.emit('notification', data);
            }
            else {
                dispatch(statusFailed(result.message));
            }
        })
        .catch(error => dispatch(statusFailed(error.message)));
};

export const updateViewFailed = (msg) => ({
    type: ActionTypes.UPDATE_VIEW_FAILED,
    payload: msg
});

export const fetchUpdateView = (me, you) => (dispatch) => {
    dispatch(profileLoading());

    const data = {
        me: me,
        you: you
    }

    return request('/api/user/profile/view', data, 'POST')
        .then(response => response.json())
        .then(() => {
            data.event = 'view';
            socket.emit('notification', data);
        })
        .catch(error => dispatch(updateViewFailed(error.message)));
};

export const fetchReport = (data) => (dispatch) => {
    //dispatch(profileLoading());
    return request('/api/user/profile/report', data, 'POST')
        .then(res => res.json())
        .then(response => {
            if (response.success)
                console.log("OK") ////////!!!!!!!!!!!!! ФИДБЭК!
            else
                dispatch(statusFailed(response.message))
        })
        .catch(error => dispatch(statusFailed(error.message)));
};