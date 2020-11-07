import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { fetchNames, fetchCountPages, fetchChatMessages, fetchSendMessage, setNameTo } from "../../redux/Chats/ActionCreators";
import { Spinner, ListGroup, ListGroupItem, Input, Form, Button } from 'reactstrap';
// import NotificationsBar from "./NotificationsBar";
import { request } from "../../util/http";
import { socket } from "../../index";
import sendmsg from "../../sound/msg_send.mp3"
import useSound from "use-sound";
import Container from "reactstrap/es/Container";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Media from "reactstrap/es/Media";
import './chatStyle.css'

const mapStateToProps = (state) => {
    return {
        login: state.login,
        chat: state.chat
    };
}

const mapDispatchToProps = (dispatch) => ({
    fetchNames: (name) => dispatch(fetchNames(name)),
    fetchCountPages: (nicknameFrom, nicknameTo) => dispatch(fetchCountPages(nicknameFrom, nicknameTo)),
    sendMessage: (nicknameFrom, nicknameTo, message) => dispatch(fetchSendMessage(nicknameFrom, nicknameTo, message)),
    fetchChatMessages: (nicknameTo, nicknameFrom, page) => dispatch(fetchChatMessages(nicknameTo, nicknameFrom, page)),
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
    useEffect(scrollToBottom, [props.chat.chats]);

    if (props.chat) {
        messagesOfThisChat = props.chat.chats.sort((a, b) => (a.id - b.id)).map((message, item) => {
            let date = new Date(message.createdat).toDateString();
            let time = new Date(message.createdat).toTimeString().split(' ')[0];

            
            switch (message.type) {
                case 'message': {
                    return <Col xs={8} key={item}
                        className={`chat__message ${props.me !== message.nick ? 'chat__message-right' : 'chat__message-left'}`}>

                        <div className={'chat__user__info'}>
                            <img src={"chat__avatar"} alt="" width={'50px'} height={'50px'} />
                            <div className={'chat__info__container'}>
                                <p className={'chat__user__nick'}>{`${message.nick}`}</p>
                                <p className={'chat__msg__date'}>{`at ${time} (${date})`}</p>
                            </div>
                        </div>
                        <p className={'chat__message__text'}>{`${message.message}`}</p>

                        <div style={getStyle(item, props.firstVisIndex)}
                            ref={item === props.firstVisIndex ? messagesEndRef : null}>
                        </div>

                    </Col>
                }
                case 'photo': {
                    return <Col xs={8} key={item}
                        className={`chat__message ${props.me !== message.nick ? 'chat__message-right' : 'chat__message-left'}`}>

                        <div className={'chat__user__info'}>
                            <img src="chat__avatar" alt="" width={'50px'} height={'50px'} />
                            <div className={'chat__info__container'}>
                                <p className={'chat__user__nick'}>{`${message.nick}`}</p>
                                <p className={'chat__msg__date'}>{`at ${time} (${date})`}</p>
                            </div>
                        </div>
                        <ChatImage src={message.message} />
                        <div style={getStyle(item, props.firstVisIndex)}
                            ref={item === props.firstVisIndex ? messagesEndRef : null}>
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
    // console.log('1 ListUsers', props);
    let listItems;

    if (props.names) {
        listItems = props.names.map((name, item) =>
            <ListGroupItem
                key={item}
                tag="button"
                value={name.nickname}
                onClick={e => { props.set(e.target.value) }}
                // onClick={e => { props.set(e.target.value); console.log(e.target.value); }}
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
    console.log('2 chat', props);
    const upRef = useRef();
    const bottomRef = useRef();
    const [play] = useSound(sendmsg);
    const playButton = useRef();
    const playSound = () => { play() };
    const [uploadedFile, setFile] = useState("");
    const { register, handleSubmit, reset } = useForm();

    const [currentPage, setCurrentPage] = useState(1);
    let [firstVisIndex, setFirstVisIndex] = useState(null);

    const getPrevMessages = () => {
        if (props.props.chat && currentPage - 1 >= 1) {
            currentPage--;
            setCurrentPage(currentPage);
            firstVisIndex = 0;
            setFirstVisIndex(firstVisIndex)
        }
    }

    const test = props.props.chat.chats.length;
    console.log(test);


    const nicknameFrom = props.props.login.me.nickname;
    const nicknameTo = props.props.chat.nicknameTo;

    const {fetchCountPages, fetchChatMessages} = props.props;

    useEffect(() => {
        if (nicknameTo) {
            fetchCountPages(nicknameFrom, nicknameTo);
            fetchChatMessages(nicknameFrom, nicknameTo, currentPage);
        }
    }, [nicknameTo, nicknameFrom, currentPage, fetchCountPages, fetchChatMessages]);

    const onUploadFile = (e) => {
        uploadedFile = e.target.files[0];
        setFile(uploadedFile);
    }

    const onSubmit = (data) => {
        // console.log(data);
        if (props.props.chat) {
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
                props.props.sendMessage(props.nicks[1], props.nicks[0], data.message);
                firstVisIndex = props.props.chat.chats.length
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
                props.props.chat && currentPage
                    ? <ChatMessages chat={props.props.chat} firstVisIndex={firstVisIndex} me={props.nicks[1]} />
                    : <div />
            }
            <Form className='message__wrapper' onSubmit={handleSubmit(onSubmit)}>
                <input type='textarea' name='message' id="message" cols={30} rows={1}
                    placeholder='Your message'
                    ref={register()}
                />
                <input type="file" name="file" onChange={onUploadFile} />
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
    const { fetchNames } = props;
    const nicknameFrom = props.login.me.nickname;

    useEffect(() => {
        fetchNames(nicknameFrom);
    }, [fetchNames, nicknameFrom]);

    console.log('Chat', props);
    return (
        <Container>
            <Row>
                <Col xs={2} className='chat__list'>
                    <ListUsers names={props.chat.names} set={props.setNameTo} />
                </Col>
                <CurrentChat props={props} nicks={[props.chat.nicknameTo, nicknameFrom]} />
            </Row>
        </Container>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);