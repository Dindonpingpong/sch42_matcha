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
            return { ...state, isLoading: false, errProfile: null, names: action.payload };

        case ActionTypes.CHAT_COUNT_PAGES:
            return { ...state, isLoading: false, errProfile: null, countPages: action.payload };

        case ActionTypes.CHAT_MESSAGES:
            return { ...state, isLoading: false, errProfile: null, chats: action.payload };

        case ActionTypes.CHAT_MESSAGES_PUSH:
            return { ...state, isLoading: false, errProfile: null, chats: state.chats.concat(action.message) };

        case ActionTypes.CHAT_MESSAGES_SHIFT:
            return { ...state, isLoading: false, errProfile: null, chats: action.message.concat(state.chats) };

        case ActionTypes.CHAT_NAME_TO_ADD:
            return { ...state, isLoading: false, errProfile: null, nicknameTo: action.nicknameTo };

        case ActionTypes.CHAT_CLEAR:
            return { ...initialState };

        case ActionTypes.CHAT_MESSAGES_CLEAR:
            return { ...state, isLoading: false, errProfile: null, chats: [], countPages: null };

        default:
            return state;
    }
}