import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { initChat, initMessages, fetchNames, fetchCountPages, fetchChatMessages, fetchSendMessage, setNameTo, pushChatMessage } from "../../redux/Chats/ActionCreators";
import { Spinner, ListGroup, ListGroupItem, Container, Row, Col, Media, Form, Button } from 'reactstrap';
// import NotificationsBar from "./NotificationsBar";
import { request } from "../../util/http";
import { socket } from "../../index";
import sendmsg from "../../sound/msg_send.mp3"
import useSound from "use-sound";
import { Loading } from '../Loading';
import NotFound from '../notFound';
import moment from 'moment';
import './Chats.css'

const mapStateToProps = (state) => {
    return {
        login: state.login,
        chat: state.chat
    };
}

const mapDispatchToProps = (dispatch) => ({
    initChat: () => dispatch(initChat()),
    initMessages: () => dispatch(initMessages()),
    fetchNames: (name) => dispatch(fetchNames(name)),
    fetchCountPages: (nicknameFrom, nicknameTo) => dispatch(fetchCountPages(nicknameFrom, nicknameTo)),
    sendMessage: (nicknameFrom, nicknameTo, message, path) => dispatch(fetchSendMessage(nicknameFrom, nicknameTo, message, path)),
    fetchChatMessages: (nicknameTo, nicknameFrom, page) => dispatch(fetchChatMessages(nicknameTo, nicknameFrom, page)),
    setNameTo: (name) => dispatch(setNameTo(name)),
    pushChatMessage: (msg) => dispatch(pushChatMessage(msg))
});

const ImageThumb = ({ image }) => {
    return (
        <div className='image-prev-wrap'>
            <img className='image-prev' src={URL.createObjectURL(image)} alt={image.name} />
        </div>
    );
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
            return ({ borderTop: '3px dashed grey' });
        if (index === 10)
            return ({ borderBottom: '3px dashed grey' });
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

    useEffect(() => {
        socket.on("chat_message", (data) => {
            props.pushChatMessage(data);
        });
    }, []);

    if (props.chat) {
        messagesOfThisChat = props.chat.chats.sort((a, b) => (a.id - b.id)).map((message, item) =>
            <Col md="8" key={item}
                className={`chat__message ${props.me !== message.nick ? 'chat__message-right' : 'chat__message-left'}`}>
                <div className='chat__user__info'>
                    <img className="chat__avatar" src={`/api/image/${message.nick}/1/${message.path}`} alt={"Ava"} />
                    <div className='chat__info__container'>
                        <p className='chat__user__nick'>{`${message.nick}`}</p>
                        <p className='chat__msg__date'>{moment(message.createdat).format('lll')}</p>
                    </div>
                </div>

                {
                    (message.type === 'message')
                        ? <p className='chat__message__text'>{`${message.message}`}</p>
                        : <ChatImage src={message.message} />
                }

                <div style={getStyle(item, props.firstVisIndex)}
                    ref={item === props.firstVisIndex ? messagesEndRef : null}>
                </div>
            </Col>
        )
    }
    return (
        <div className='chat__window'>
            {messagesOfThisChat}
        </div>
    );
}

function ListUsers(props) {
    let listItems;

    if (props.names.length > 0) {
        listItems = props.names.map((name, item) =>
            <ListGroupItem
                className={name.nickname === props.click ? 'active-item' : ''}
                key={item}
                tag="button"
                value={name.nickname}
                onClick={e => { props.set(e.target.value) }}
            >
                {name.nickname}
            </ListGroupItem >
        );
    }
    return (
        <Col xs="2" className='chat__list'>
            <ListGroup>
                {listItems}
            </ListGroup>
        </Col>
    );
}

function CurrentChat(props) {
    const bottomRef = useRef();
    const upRef = useRef();
    const [play] = useSound(sendmsg);
    const playButton = useRef();
    const playSound = () => { play() };
    const [uploadedFile, setFile] = useState("");
    const { register, handleSubmit, reset } = useForm();

    const [currentPage, setCurrentPage] = useState(1);
    const [firstVisIndex, setFirstVisIndex] = useState(props.props.chat.chats.length - 1);

    const getPrevMessages = () => {
        if (props.props.chat && currentPage + 1 <= props.props.chat.countPages) {
            setCurrentPage(currentPage + 1);
            setFirstVisIndex(0);
        }
    }

    const nicknameFrom = props.props.login.me.nickname;
    const nicknameTo = props.props.chat.nicknameTo;
    const { fetchCountPages, fetchChatMessages, initMessages } = props.props;

  

    useEffect(() => {
        console.log('here', nicknameTo);
        if (nicknameTo) {
            console.log('here2', nicknameTo);
            fetchCountPages(nicknameFrom, nicknameTo);
            fetchChatMessages(nicknameFrom, nicknameTo, currentPage);
        }
    }, [nicknameTo, nicknameFrom, currentPage, fetchCountPages, fetchChatMessages]);

    useEffect(() => {
        initMessages();
        setCurrentPage(1);
        setFirstVisIndex(props.props.chat.chats.length - 1);
    }, [initMessages, nicknameTo]);

    const onUploadFile = (e) => {
        setFile(e.target.files[0]);
    }

    const onSubmit = (data) => {
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
                console.log(props.nicks[1], props.nicks[0]);
                request(`/api/chat/image/${props.nicks[1]}/${props.nicks[0]}`, formData, 'POST', 'image')
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        let newPhotoData = {
                            idfrom: props.nicks[1],
                            message: data.message.message,
                            createdat: data.message.createdat,
                            type: "photo",
                            id: data.message.id
                        };
                        console.log('RERERE', newPhotoData);
                        playButton.current.click();
                        socket.emit('new_message', newPhotoData);
                        setFile("");
                    })
                    .catch(e => {
                        alert(e.message);
                    })
            }
            if (data.message) {
                playButton.current.click();
                console.log('here', props.props.login.me.photos[0][1]);
                props.props.sendMessage(props.nicks[1], props.nicks[0], data.message, props.props.login.me.photos[0][1]);
                setFirstVisIndex(props.props.chat.chats.length);
            }
        }
    }

    return (
        <Col xs="10" className='current__chat'>
            <div ref={upRef} />
            <button className="current__chat-hidden" type='button' onClick={playSound} ref={playButton} />
            {
                (currentPage >= props.props.chat.countPages)
                    ? <div />
                    : <Button className='current__chat-prev' type='button' onClick={getPrevMessages}>Get previous messages</Button>
            }
            {
                (props.props.chat && currentPage)
                    ? <ChatMessages pushChatMessage={props.props.pushChatMessage} chat={props.props.chat} firstVisIndex={firstVisIndex} me={props.nicks[1]} />
                    : <div />
            }
            {
                props.nicks[0] &&
                <Form className='message__wrapper' onSubmit={handleSubmit(onSubmit)}>
                    <input className='message__wrapper-msg' type='textarea' name='message' id="message" cols={30} rows={1}
                        placeholder='Your message'
                        ref={register()}
                    />

                    <div className='message__wrapper-btn'>
                        <label className="btn btn-dark">
                            +
                        <input className="current__chat-hidden" type="file" onChange={onUploadFile} />

                        </label>

                        <Button type='submit' className='button__send'>Send</Button>
                    </div>
                    {
                        uploadedFile &&
                        <ImageThumb image={uploadedFile} />
                    }
                    <div ref={bottomRef} />
                </Form>
            }

        </Col>
    );
}

const Chats = (props) => {
    const { fetchNames, initChat } = props;
    const nicknameFrom = props.login.me.nickname;

    useEffect(() => {
        fetchNames(nicknameFrom);
    }, [fetchNames, nicknameFrom, initChat]);

    if (props.chat.isLoading) {
        return (
            <Loading />
        );
    }
    else if (props.chat.errProfile) {
        return (
            <Container>
                <Row>
                    {/* <h4>{props.profile.errProfile}</h4> */}
                    <h4>Error</h4>
                </Row>
            </Container>
        );
    }
    else if (props.chat.names != null) {
        return (
            <section className="chats text-break">
                <Container>
                    <Row>
                        <ListUsers names={props.chat.names} click={props.chat.nicknameTo} set={props.setNameTo} />
                        <CurrentChat props={props} nicks={[props.chat.nicknameTo, nicknameFrom]} />
                    </Row>
                </Container>
            </section>
        );
    }
    else
        return (
            <NotFound />
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(Chats);