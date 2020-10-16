import * as ActionTypes from '../userForm/ActionTypes';

export const ProfileReducer = (state = {
    isLoading: true,
    errMsg: null,
    info: {}
}, action) => {
    
    
    switch (action.type) {
        case ActionTypes.PROFILE_ADD:
            return { ...state, isLoading: false, errMsg: null, info: action.payload };

        case ActionTypes.PROFILE_LOADING:
            return { ...state, isLoading: true, errMsg: null, info: {} };

        case ActionTypes.PROFILE_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload, info: {} };

        default:
            return state;
    }
}
