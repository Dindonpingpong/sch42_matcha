import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: true,
    errMsg: null,
    names: [],
    chats: [],
    nicknameTo: null,
    countPages: null
};


export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.CHAT_LOADING:
            return { ...state, isLoading: true, errProfile: null };

        case ActionTypes.CHAT_FAILED:
            return { ...state, isLoading: false, errProfile: action.payload };

        case ActionTypes.CHAT_NAMES:
            return { ...state, isLoading: false, names: action.payload };

        case ActionTypes.CHAT_COUNT_PAGES:
            return { ...state, isLoading: false, countPages: action.payload };

        case ActionTypes.CHAT_MESSAGES:
            return { ...state, isLoading: false, chats: action.payload };

        case ActionTypes.CHAT_NAME_TO_ADD:
            return { ...state, isLoading: false, nicknameTo: action.payload };

        default:
            return state;
    }
}