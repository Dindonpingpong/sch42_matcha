import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { getMessagesOfThisChat, getPrevMsg, sendMessage } from "../../redux/Chats/chatReducer";
import { Modal, ModalBody, ModalHeader, ModalFooter, Spinner, Alert, ListGroup, ListGroupItem, Input, Form, Button } from 'reactstrap';
import NotificationsBar from "./NotificationsBar";
import { request } from "../../util/http";
import { socket } from "./NotificationsBar";
import sendmsg from "../../sound/msg_send.mp3"
import useSound from "use-sound";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Media from "reactstrap/es/Media";

const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} />;
};

const ChatImage = (props) => {
    let [imgSrc, setImgSrc] = useState(<Spinner className={'chat__image'} />);
    useEffect(() => {
        request(`/api/user/getchatimage`, { img: props.src }, 'POST').then((res => res.json())).then((resp => {
            let imgSrcUpl = 'data:image/jpeg;base64,' + resp.img;
            setImgSrc(<Media className={'chat__image'} src={imgSrcUpl} alt="" />);
        })).catch((err) => console.log(err))
    }, [])
    return (
        imgSrc
    )
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
    const [modal, setModal] = useState(false);

    const toggle = () => {
        console.log('click')
        setModal(!modal)
    };

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
                            <img src="chat__avatar" alt="" width={'50px'} height={'50px'} />
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
                        <a href="#" onClick={toggle}><ChatImage src={message.message} /></a>
                        {/*
                         <Modal isOpen={modal} toggle={toggle} >
                            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        */}


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
    const mock = [{ nickname: 'test4' }, { nickname: 'mgrass' }];
    let listItems;

    if (mock) {
        listItems = mock.map((user, item) =>
            <ListGroupItem key={item}>{user.nickname}</ListGroupItem>
        )
    }

    return (
        <ListGroup>
            {listItems}
        </ListGroup>
    )
}

let ChatInner = (props) => {
    const bottomRef = useRef();
    const upRef = useRef();
    const [play] = useSound(sendmsg);
    const playButton = useRef();
    const playSound = () => {
        play()
    }
    let [uploadedFile, setFile] = useState("");
    const { register, handleSubmit, reset } = useForm();
    let [currentPage, setCurrentPage] = useState(null);
    let [firstVisIndex, setFirstVisIndex] = useState(null);
    let chats = props.chats;
    let currentChat;
    let myNick = 'rkina';
    let partnerNick = myNick === 'rkina' ? 'mgrass' : 'rkina';

    currentChat = chats.find((chat) => {
        return (chat.nicks.includes(myNick) && chat.nicks.includes(partnerNick))
    });

    if (!currentChat) {
        console.log('oops')
        props.getMessagesOfThisChatDisp(myNick, partnerNick);
    }
    if (currentChat && !currentPage) {
        currentPage = currentChat.countPages;
        firstVisIndex = currentChat.messages.length - 1
        setCurrentPage(currentPage);
        setFirstVisIndex(setFirstVisIndex);
    }

    const onSubmit = (data) => {
        if (currentChat) {
            reset();
            if (uploadedFile !== "") {
                let type = uploadedFile.type;
                if (type !== 'image/jpeg' && type !== 'image/png' && type !== 'image/gif' && type !== 'image/jpg') {
                    alert('Wrong format!');
                    return;
                }
                let formData = new FormData();
                formData.append('photo', uploadedFile);
                request(`/api/user/chatimage/${myNick}/${partnerNick}`, formData, 'POST', 'image')
                    .then(res => {
                        return res.json()
                    }).then(data => {

                        let newPhotoData = {
                            idfrom: myNick,
                            idto: partnerNick,
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
                console.log('curMsg');
                let newMessage = {
                    from: myNick,
                    to: partnerNick,
                    message: data.message
                };
                playButton.current.click();
                console.log('message is:', newMessage)
                props.sendMessageDisp(newMessage);
                firstVisIndex = currentChat.messages.length
                setFirstVisIndex(firstVisIndex);
            }

        }

    }
    const onUploadFile = (e) => {
        uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    }

    const getPrevMessages = () => {
        if (currentChat && currentPage - 1 >= 1) {
            currentPage--;
            setCurrentPage(currentPage);
            firstVisIndex = 0;
            setFirstVisIndex(firstVisIndex)
            props.addPrevMsg(currentChat.nicks, currentPage)
        }
    }

    return (<Container>
        <NotificationsBar chats={props.chats} myNick={myNick} />
        <Row>
            <Col xs={2} className={'chat__list'}>
                <ListUsers />
            </Col>
            <Col className={'current__chat'}>
                <div ref={upRef} />
                <button type={'button'} onClick={playSound} ref={playButton} style={{ display: 'none' }} />
                {currentPage <= 1 ? <div /> :
                    <Button type={'button'} onClick={getPrevMessages}>get previous messages</Button>}

                {currentChat && currentPage ? <ChatMessages chat={currentChat} firstVisIndex={firstVisIndex} myNick={myNick} /> :
                    <div />}
                <Form className={'message__wrapper'} onSubmit={handleSubmit(onSubmit)}>
                    <input type={'textarea'} name='message' id="message" cols={30} rows={1}
                        placeholder={'Your message'}
                        ref={register()} />
                    <input type="file" name="file" onChange={onUploadFile} />
                    {uploadedFile && <ImageThumb image={uploadedFile} />}
                    <Button type={'submit'} className={'button__send'}>Send</Button>
                    <div ref={bottomRef} />
                </Form>
            </Col>
        </Row>
    </Container>
    )
}

let mapStateToProps = (state) => {
    return state;
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessageDisp: (myId, partnerId, message) => dispatch(sendMessage(myId, partnerId, message)),
        getMessagesOfThisChatDisp: (idUserTo, idUserFrom) => dispatch(getMessagesOfThisChat(idUserTo, idUserFrom)),
        addPrevMsg: (nicks, pageNumber) => dispatch(getPrevMsg(nicks, pageNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInner);