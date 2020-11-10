import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: false,
    errMsg: null,
    notifications: {}
}

export const NotificationReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.NOTIFICATIONS_ADD:
            return { ...state, isLoading: false, errMsg: null, notifications: action.payload };

        case ActionTypes.NOTIFICATIONS_LOADING:
            return { ...state, isLoading: true, errMsg: null };

        case ActionTypes.NOTIFICATIONS_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload, notifications: {} };

        case ActionTypes.NOTIFICATIONS_PUSH:
            return { ...state, isLoading: false, errProfile: null, notifications: state.notifications.concat(action.notification) };

        default:
            return state;
    }
}
