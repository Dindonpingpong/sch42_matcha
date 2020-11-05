
export const getChatMessagesSuccessInner = 'GET_CHAT_MESSAGES_SUCCESS_INNER';
export const getChatMessagesSuccessOuter= 'GET_CHAT_MESSAGES_SUCCESS_OUTER';
export const getChatMessagesFail = 'GET_CHAT_MESSAGES_FAIL';

export const successSendMessageInner = 'SUCCESS_MESSAGE_SEND_INNER';
export const successSendMessageOuter = 'SUCCESS_MESSAGE_SEND_OUTER';
export const failSendMessage = 'FAIL_FETCH';

export const getPreviousMessagesSuccessInner = 'GET_PREV_MSG_SUCCESS_INNER';
export const getPreviousMessagesSuccessOuter = 'GET_PREV_MSG_SUCCESS_OUTER';
export const getPreviousMessagesFail = 'GET_PREV_MSG_FAIL';

export const refreshChat= 'REFRESH_CHAT';

export const getChatMessagesActionCreator = (data)=> {
    return ({
        type: getChatMessagesSuccessInner,
        payload: data,
    })
}

export const successMessageSendActionCreator = (data) => {
    return ({
        type: successSendMessageInner,
        payload: data
    });
};

export const refreshChatActionCreator = (message) => {
    return ({
        type: refreshChat,
        message:message
    });
};

export const getPreviousMessagesActionCreator =(messages)=>{
    return(
        {
            type:getPreviousMessagesSuccessInner,
            messages: messages
        }
    )
}