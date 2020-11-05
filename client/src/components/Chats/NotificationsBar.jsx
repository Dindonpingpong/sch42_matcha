import {getMessagesOfThisChat, sendMessage} from "../../redux/Chats/chatReducer";
import {refreshChatActionCreator} from "../../redux/Chats/constants";
import {connect} from "react-redux";
import io from "socket.io-client";
import React, {useEffect, useRef, useState} from "react";
import {Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import useSound from 'use-sound';
import getmsg from "../../sound/msg_get2.mp3";
export let socket = io('/api/io/chat', {
    'multiplex': false, transports: ['websocket'], forceNew: true
})
//export let socket = io('http://localhost:5000/chat')

let NotificationsBarInner = (props) => {

    let [alert, showAlert] = useState({visible: false, message: ''});
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [historyOfNotif, setHistoryOfNotif] = useState([]);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [play] = useSound(getmsg);
    const playButton = useRef();
    const playSound = ()=>{play()}

    useEffect(() => {
        socket.on(`msg_to_${props.myNick}`, function (msg) {

            if (msg.idto === props.myNick) {
                showAlert({visible: true, message: msg.message})
                playButton.current.click();
                window.setTimeout(() => {
                    showAlert({visible: false, message: ''})
                }, 5000);

                historyOfNotif.push(<DropdownItem key={msg.id}>{`${msg.idfrom}: ${msg.message}`}</DropdownItem>)
                setHistoryOfNotif(historyOfNotif)
            }
            props.getMessage(msg);
        })
    }, []);
    const onDismiss = () => showAlert({visible: false, message: ''});
    return (
        <div>
            <button onClick={playSound} ref={playButton} style={{display:'none'}}/>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    Notifiations
                </DropdownToggle>
                <DropdownMenu>
                    {historyOfNotif}
                </DropdownMenu>
            </Dropdown>
            <Alert color="primary" isOpen={alert.visible} toggle={onDismiss}>
                {alert.message}
            </Alert>
        </div>
    )
}


let mapStateToProps = (state) => {
    return state;
}

let mapDispatchToProps = (dispatch) => {
    return {
        getMessage: (message) => {
            dispatch(refreshChatActionCreator(message))
        },
    }
}

const NotificationsBar = connect(mapStateToProps, mapDispatchToProps)(NotificationsBarInner);

export default NotificationsBar;