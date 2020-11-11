import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';

export const notificationsLoading = () => ({
    type: ActionTypes.NOTIFICATIONS_LOADING
});

export const notificationsAdd = (data) => ({
    type: ActionTypes.NOTIFICATIONS_ADD,
    payload: data
});

export const notificationsFailed = (msg) => ({
    type: ActionTypes.NOTIFICATIONS_FAILED,
    payload: msg
});

export const setNew = (data) => ({
    type: ActionTypes.NOTIFICATIONS_NEW,
    status: data
});

export const setHasNew = (status) => (dispatch) => {
    return dispatch(setNew(status));
}

export const fetchNotifications = (login) => (dispatch) => {
    dispatch(notificationsLoading());

    return request('/api/user/notifications/' + login)
        .then(res => res.json())
        .then(result => {
            if (result.success === true) {
                dispatch(notificationsAdd(result.data));
            }
            else {
                dispatch(notificationsFailed(result.message));
            }
        })
        .catch(error => dispatch(notificationsFailed(error.message)));
}
