import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { getMessagesOfThisChat, getPrevMsg, sendMessage } from "../../redux/Chats/chat.reducer";
import { Spinner, ListGroup, ListGroupItem, Input, Form, Button } from 'reactstrap';
import NotificationsBar from "./NotificationsBar";
import { request } from "../../util/http";
import { socket } from "../../index";
import sendmsg from "../../sound/msg_send.mp3"
import useSound from "use-sound";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Media from "reactstrap/es/Media";

import {
    setNameTo
} from '../../redux/chats/ActionCreators';

const mapStateToProps = (state) => {
    return {
        login: state.login,
        chats: state.chats
    };
}

const mapDispatchToProps = (dispatch) => ({
    sendMessageDisp: (nicknameFrom, nicknameTo, message) => dispatch(sendMessage(nicknameFrom, nicknameTo, message)),
    getMessagesOfThisChatDisp: (nicknameFrom, nicknameTo) => dispatch(getMessagesOfThisChat(nicknameFrom, nicknameTo)),
    addPrevMsg: (nicks, pageNumber) => dispatch(getPrevMsg(nicks, pageNumber)),
    /* добавить */
    setNameTo: (name) => dispatch(setNameTo(name))
});



const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
};

const ChatImage = (props) => {
    let [imgSrc, setImgSrc] = useState(<Spinner className='chat__image' />);
    useEffect(() => {
        request(`/api/chat/getchatimage`, { img: props.src }, 'POST')
            .then((res => res.json()))
            .then((resp => {
                let imgSrcUpl = 'data:image/jpeg;base64,' + resp.img;
                setImgSrc(<Media className={'chat__image'} src={imgSrcUpl} alt="" />);
            }))
            .catch((err) => console.log(err))
    }, []);
    return (
        imgSrc
    );
}

function getStyle(index, firstIndex) {
    if (firstIndex === 0) {
        if (index === 0)
            return ({ borderTop: '1px solid green' });
        if (index === 10)
            return ({ borderBottom: '1px solid green' });
    }
}

const ChatMessages = (props) => {
    let messagesOfThisChat = [];
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesEndRef && messagesEndRef.current)
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(scrollToBottom, [props.chat.messages]);

    if (props.chat) {
        messagesOfThisChat = props.chat.messages.sort((a, b) => (a.id - b.id)).map((message, i) => {
            let date = new Date(message.createdat).toDateString();
            let time = new Date(message.createdat).toTimeString().split(' ')[0];

            switch (message.type) {
                case 'message': {
                    return <Col xs={8} key={i}
                        className={`chat__message ${props.myNick === message.nickname ? 'chat__message-right' : 'chat__message-left'}`}>

                        <div className={'chat__user__info'}>
                            <img src={"chat__avatar"} alt="" width={'50px'} height={'50px'} />
                            <div className={'chat__info__container'}>
                                <p className={'chat__user__nick'}>{`${message.nickname}`}</p>
                                <p className={'chat__msg__date'}>{`at ${time} (${date})`}</p>
                            </div>
                        </div>
                        <p className={'chat__message__text'}>{`${message.message}`}</p>

                        <div style={getStyle(i, props.firstVisIndex)}
                            ref={i === props.firstVisIndex ? messagesEndRef : null}>
                        </div>

                    </Col>
                }
                case 'photo': {
                    return <Col xs={8} key={i}
                        className={`chat__message ${props.myNick === message.nickname ? 'chat__message-right' : 'chat__message-left'}`}>

                        <div className={'chat__user__info'}>
                            <img src="chat__avatar" alt="" width={'50px'} height={'50px'} />
                            <div className={'chat__info__container'}>
                                <p className={'chat__user__nick'}>{`${message.nickname}`}</p>
                                <p className={'chat__msg__date'}>{`at ${time} (${date})`}</p>
                            </div>
                        </div>
                        <ChatImage src={message.message} />
                        <div style={getStyle(i, props.firstVisIndex)}
                            ref={i === props.firstVisIndex ? messagesEndRef : null}>
                        </div>

                    </Col>
                }
            }
        })
    }
    return (
        <div className={'chat__window'}>
            {messagesOfThisChat}
        </div>
    )
}







function ListUsers(props) {
    let listItems;

    if (props.names) {
        listItems = props.names.map((name, item) =>
            <ListGroupItem
                key={item}
                tag="button"
                value={name.nickname}
                onClick={e => { props.set(e.target.value) }}
            >
                {name.nickname}
            </ListGroupItem>
        );
    }
    return (
        <ListGroup>
            {listItems}
        </ListGroup>
    );
}

function CurrentChat(props) {
    const upRef = useRef();
    const bottomRef = useRef();
    const [play] = useSound(sendmsg);
    const playButton = useRef();
    const playSound = () => { play };
    const [uploadedFile, setFile] = useState("");
    const { register, handleSubmit, reset } = useForm();

    const [currentPage, setCurrentPage] = useState(null);
    const [firstVisIndex, setFirstVisIndex] = useState(null);

    const getPrevMessages = () => {
        if (props.chats && currentPage - 1 >= 1) {
            currentPage--;
            setCurrentPage(currentPage);
            firstVisIndex = 0;
            setFirstVisIndex(firstVisIndex)
            props.props.addPrevMsg(props.nicks, currentPage)
        }
    }

    const onUploadFile = (e) => {
        uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    }

    const onSubmit = (data) => {
        // console.log(data);
        if (props.chats) {
            reset();
            if (uploadedFile !== "") {
                let type = uploadedFile.type;
                if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/gif' && type !== 'image/jpg') {
                    alert('Wrong format!');
                    return;
                }
                let formData = new FormData();
                formData.append('photo', uploadedFile);
                request(`/api/user/chatimage/${props.nicks[1]}/${props.nicks[0]}`, formData, 'POST', 'image')
                    .then(res => res.json())
                    .then(data => {
                        let newPhotoData = {
                            idfrom: props.nicks[1],
                            idto: props.nicks[0],
                            message: data.message.message,
                            createdat: data.message.createdat,
                            type: "photo",
                            id: data.message.id
                        };
                        console.log(newPhotoData);
                        playButton.current.click();
                        socket.emit('new_message', newPhotoData)
                        uploadedFile = "";
                        setFile(uploadedFile)
                    })
                    .catch(e => {
                        alert(e.message);
                    })
            }
            if (data.message) {
                playButton.current.click();
                props.props.sendMessageDisp(props.nicks[1], props.nicks[0], data.message);
                firstVisIndex = props.props.chats.messages.length
                setFirstVisIndex(firstVisIndex);
            }
        }
    }

    return (
        <Col className={'current__chat'}>
            <div ref={upRef} />
            <button type='button' onClick={playSound} ref={playButton} style={{ display: 'none' }} />
            {
                currentPage <= 1
                    ? <div />
                    : <Button type='button' onClick={getPrevMessages}>get previous messages</Button>
            }
            {
                props.chats && currentPage
                    ? <ChatMessages chat={props.props.chats} firstVisIndex={firstVisIndex} me={props.props.nicks[1]} />
                    : <div />
            }
            <Form className='message__wrapper' onSubmit={handleSubmit(onSubmit)}>
                <Input type='textarea' name='message' id="message" cols={30} rows={1}
                    placeholder='Your message'
                    ref={register}
                />
                <Input type="file" name="file" onChange={onUploadFile} />
                {
                    uploadedFile &&
                    <ImageThumb image={uploadedFile} />
                }
                <Button type='submit' className='button__send'>Send</Button>
                <div ref={bottomRef} />
            </Form>
        </Col>
    );
}

const Chats = (props) => {
    const nicknameFrom = props.login.me.nickname;
    const nicknameTo = props.chats.nicknameTo;

    useEffect(() => {
        getMessagesOfThisChatDisp(nicknameFrom, nicknameTo);
    }, [nicknameTo, nicknameFrom]);

    return (
        <Container>
            <Row>
                <Col xs={2} className='chat__list'>
                    <ListUsers names={props.chats.names} set={props.chats.setNameTo} />
                </Col>
                <CurrentChat props={props} nicks={[nicknameTo, nicknameFrom]} />
            </Row>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);