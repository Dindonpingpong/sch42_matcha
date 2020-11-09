import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';
import { socket } from "../../util/socket";

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

export const nameAdd = (data) => ({
    type: ActionTypes.CHAT_NAME_TO_ADD,
    nicknameTo: data
});

export const pushChat = (data) => ({
    type: ActionTypes.CHAT_MESSAGES_PUSH,
    message: data
});

export const shiftChat = (data) => ({
    type: ActionTypes.CHAT_MESSAGES_SHIFT,
    message: data
});

export const chatClear = () => ({
    type: ActionTypes.CHAT_CLEAR
});

export const chatMessagesClear = () => ({
    type: ActionTypes.CHAT_MESSAGES_CLEAR
});

export const setNameTo = (data) => (dispatch) => {
    dispatch(nameAdd(data));
};

export const pushChatMessage = (data) => (dispatch) => {
    dispatch(pushChat(data));
};

export const initChat = () => (dispatch) => {
    dispatch(chatClear());
};

export const initMessages = () => (dispatch) => {
    dispatch(chatMessagesClear());
};

export const fetchNames = (nickname) => (dispatch) => {
    dispatch(chatLoading());

    return request('/api/chat/users/' + nickname)
        .then(response => response.json())
        .then(result => dispatch(setChatNames(result.data)))
        .catch(error => dispatch(chatFailed(error.message)));
};

export const fetchCountPages = (me, you) => (dispatch) => {
    // dispatch(chatLoading());

    return request(`/api/chat/messages/${me}/${you}`)
        .then(response => response.json())
        .then(result => dispatch(setCountPages(result.data)))
        .catch(error => dispatch(chatFailed(error.message)));
};

export const fetchChatMessages = (me, you, page) => (dispatch) => {
    // dispatch(chatLoading());

    return request(`/api/chat/message/${me}/${you}/${page}`)
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                if (page > 1)
                    dispatch(shiftChat(result.result));
                else
                    dispatch(setChatMessage(result.result));
            }
            else
                dispatch(chatFailed(result.message));
        })
        .catch(error => dispatch(chatFailed(error.message)));
};

export const fetchSendMessage = (me, you, message, path) => (dispatch) => {
    // dispatch(chatLoading());

    const data = {
        from: me,
        to: you,
        message: message,
        path: path
    };

    return request('/api/chat/message/', data, 'POST')
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                socket.emit('send_message', result.data);
            }
            else
                dispatch(chatFailed(result.message));
        })
        .catch(error => dispatch(chatFailed(error.message)));
};

export const fetchSendFile = (me, you, formData) => (dispatch) => {
    // dispatch(chatLoading());

    request(`/api/chat/image/${me}/${you}`, formData, 'POST', 'image')
        .then(response => response.json())
        .then(result => {
            if (result.success)
                socket.emit('send_message', result.data);
            else
                dispatch(chatFailed(result.message));
        })
        .catch(error => dispatch(chatFailed(error.message)));
};