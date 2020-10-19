import * as ActionTypes from './ActionTypes';

export const ProfileReducer = (state = {
    isLoading: true,
    errMsg: null,
    errView: null,
    errLike: null,
    info: {},
    views: [],
    likes: []
}, action) => {

    switch (action.type) {
        case ActionTypes.PROFILE_ADD:
            return { ...state, isLoading: false, errMsg: null, info: action.payload };

        case ActionTypes.VIEW_ADD:
            return { ...state, isLoading: false, errMsg: null, views: action.payload };

        case ActionTypes.LIKE_ADD:
            return { ...state, isLoading: false, errMsg: null, likes: action.payload };

        case ActionTypes.PROFILE_LOADING:
            return { ...state, isLoading: true, errMsg: null, info: {} };

        case ActionTypes.PROFILE_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload, info: {} };

        case ActionTypes.VIEW_FAILED:
            return { ...state, isLoading: false, errView: action.payload, likes: [] };

        case ActionTypes.LIKE_FAILED:
            return { ...state, isLoading: false, errLike: action.payload, views: [] };

        default:
            return state;
    }
}
