import * as ActionTypes from './ActionTypes';

export const ProfileReducer = (state = {
    isLoading: true,
    errProfile: null,
    info: {
    },
    views: [],
    likes: [],
    status: null
}, action) => {

    switch (action.type) {
        case ActionTypes.PROFILE_ADD:
            return { ...state, isLoading: false, errProfile: null, info: action.payload };

        case ActionTypes.PROFILE_LOADING:
            return { ...state, isLoading: true, errProfile: null, info: {} };

        case ActionTypes.PROFILE_FAILED:
            return { ...state, isLoading: false, errProfile: action.payload, info: {} };

        case ActionTypes.VIEW_ADD:
            return { ...state, isLoading: false, errProfile: null, views: action.payload };

        case ActionTypes.VIEW_FAILED:
            return { ...state, isLoading: false, errProfile: action.payload, views: [] };

        case ActionTypes.LIKE_ADD:
            return { ...state, isLoading: false, errProfile: null, likes: action.payload };

        case ActionTypes.LIKE_FAILED:
            return { ...state, isLoading: false, errProfile: action.payload, likes: [] };

        case ActionTypes.STATUS_ADD:
            return { ...state, isLoading: false, errProfile: null, status: action.payload };

        case ActionTypes.STATUS_FAILED:
            return { ...state, isLoading: false, errProfile: action.payload, status: null };

        case ActionTypes.UPDATE_VIEW_FAILED:
            return { ...state, isLoading: false, errProfile: action.payload, status: null };

        default:
            return state;
    }
}
