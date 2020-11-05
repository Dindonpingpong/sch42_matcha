import {
    failSendMessage,
    getChatMessagesActionCreator,
    getChatMessagesFail,
    getChatMessagesSuccessInner,
    getChatMessagesSuccessOuter, getPreviousMessagesActionCreator,
    getPreviousMessagesFail, getPreviousMessagesSuccessInner, getPreviousMessagesSuccessOuter,
    refreshChat,
    successMessageSendActionCreator,
    successSendMessageInner,
    successSendMessageOuter
} from "./constants";
import {request} from "../../util/http";
import {socket} from "../../components/Chats/NotificationsBar";

const cloneDeep = require('deep-clone');

let getMessagesByPageNumber = (myNick, partnerNick, pageCount)=>{
    return request(`/api/chat/message/${myNick}/${partnerNick}/${pageCount}`)
        .then(res => res.json())
}

export const getMessagesOfThisChat = (myNick, partnerNick) => (dispatch) => {
    let pageCount = 1;
    partnerNick='mgrass'
        myNick = 'rkina';////////////////////////////////////////////////////
    let getCount = () => {
        return request(`/api/chat/messages/${myNick}/${partnerNick}`)
            .then(res => res.json())
            .then((resp) => resp.result)
            .then((count) => {
                console.log(`count: ${count}`);
                pageCount = count;
                return getMessagesByPageNumber(myNick,partnerNick,pageCount)
            })
    }
return getCount()
        .then(result => {
            let nicks = Array(myNick, partnerNick)
            if (result.success === true) {
                dispatch(getChatMessagesActionCreator({
                    type: getChatMessagesSuccessOuter,
                    messages: result,
                    nicks: nicks,
                    countPages : pageCount
                }))
            } else {
                dispatch({type: getChatMessagesFail, payload: []});
            }
        })
        .catch(error => dispatch({type: getChatMessagesFail, payload: error.message}));
}

export const getPrevMsg = (nicks, pageNumber) =>{
    return dispatch=>{
        try {
            getMessagesByPageNumber(nicks[0],nicks[1],pageNumber).then((result=>{
                if(result.success === true)
                {
                    dispatch(getPreviousMessagesActionCreator({
                        type: getPreviousMessagesSuccessOuter,
                        messages:result,
                        nicks:nicks
                    }))
                }
                else
                    dispatch({type: getPreviousMessagesFail, payload: []})
                })
            )
        }
        catch (err){
            dispatch({type: getPreviousMessagesFail, payload: []})
        }
    };
}

export const sendMessage = (data) => {
    return dispatch => {
        try {
            request(`/api/chat/message`, data, 'POST')
                .then(res => res.json())
                .then((result) => {
                    if(result.success){
                        dispatch(successMessageSendActionCreator({
                            message: result.message,
                            type: successSendMessageOuter,
                        }))
                    }
            })
        } catch (err) {
            console.log(err);
            dispatch({type: failSendMessage, payload: []})
        }
    }
};


function findChat(chats, firstNick, secNick) {
    return chats.find((chat) => chat.nicks.includes(firstNick) && chat.nicks.includes(secNick))
}

export default function chatsReducer(state = [], action) {
    let stateCopy = cloneDeep(state);
    // let stateCopy = { ...state };
    switch (action.type) {
        case getChatMessagesSuccessInner: {
            let newChat = {};
            newChat.nicks = action.payload.nicks;
            newChat.messages = action.payload.messages.result;
            newChat.countPages = action.payload.countPages
            if (!findChat(stateCopy, ...newChat.nicks))
                stateCopy.push(newChat)
            return stateCopy;
        }
        case successSendMessageInner: {
            socket.emit('new_message', action.payload.message);
            return stateCopy;
        }
        case refreshChat:{
            let chat = findChat(stateCopy, action.message.idfrom,action.message.idto);
            let message = {
                id:action.message.id,
                nickname: action.message.idfrom,
                createdat:action.message.createdat,
                message:action.message.message,
                type: action.message.type
            }
            if(chat && !chat.messages.find(msg=>msg.id === action.message.id))
                chat.messages.push(message);
            return stateCopy
        }
        case getPreviousMessagesSuccessInner:{
            let messages = action.messages.messages.result;
            let nicks = action.messages.nicks;
            let chat = findChat(stateCopy,nicks[0],nicks[1])
            if(chat)
                chat.messages.unshift(...messages)
            return stateCopy
        }
        case getPreviousMessagesFail:{
            console.log(getPreviousMessagesFail);
            break;
        }
        case failSendMessage: {
            console.log(failSendMessage);
            break;
        }/*
         case logoutEraseProfile:{
             return initialState;
        }*/
    }
    return state;
}