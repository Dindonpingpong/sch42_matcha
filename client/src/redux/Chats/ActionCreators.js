import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';
import { socket } from "../../index"

export const chatLoading = () => ({
    type: ActionTypes.CHAT_LOADING
});

export const chatFailed = (msg) => ({
    type: ActionTypes.CHAT_FAILED,
    payload: msg
});

export const setChatNames = (data) => ({
    type: ActionTypes.CHAT_NAMES,
    payload: data
});

export const setCountPages = (data) => ({
    type: ActionTypes.CHAT_COUNT_PAGES,
    payload: data
});

export const setChatMessage = (data) => ({
    type: ActionTypes.CHAT_MESSAGES,
    payload: data
});

export const fetchNames = (nickname) => (dispatch) => {
    dispatch(chatLoading());

    return request('/api/chat/users/' + nickname)
        .then(response => response.json())
        .then(result => dispatch(setChatNames(result)))
        .catch(error => dispatch(chatFailed(error.message)));
};

export const fetchCountPages = (me, you) => (dispatch) => {
    dispatch(chatLoading());

    return request(`/api/chat/messages/${me}/${you}`)
        .then(response => response.json())
        .then(result => dispatch(setCountPages(result)))
        .catch(error => dispatch(chatFailed(error.message)));
};

export const fetchChatMessages = (me, you, page) => (dispatch) => {
    dispatch(chatLoading());

    return request(`/api/chat/message/${me}/${you}/${page}`)
        .then(response => response.json())
        .then(result => {
            if (result.success)
                dispatch(setChatMessage(result.result));
            else
                dispatch(chatFailed(result.message));
        })
        .catch(error => dispatch(chatFailed(error.message)));
};

export const fetchSendMessage = (me, you, message) => (dispatch) => {
    dispatch(chatLoading());

    const data = {
        from: me,
        to: you,
        message: message
    };

    return request('/api/chat/message/', data, 'POST')
        .then(response => response.json())
        .then(result => {
            if (result.success)
                socket.emit('new_message', result.data);
            else
                dispatch(chatFailed(result.message));
        })
        .catch(error => dispatch(chatFailed(error.message)));
};
