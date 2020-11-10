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

export const push = (data) => ({
    type: ActionTypes.NOTIFICATIONS_PUSH,
    notification: data
});

export const pushNotification = (data) => (dispatch) => {
    return dispatch(push(data));
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
