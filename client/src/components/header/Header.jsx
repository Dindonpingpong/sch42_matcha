import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    DropdownItem,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOut } from '../../redux/login/ActionCreators';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { initFilter } from '../../redux/filter/ActionCreators';
import { initChat } from '../../redux/chats/ActionCreators';
import { fetchNotifications, setHasNew } from '../../redux/notification/ActionCreators';
import { socket } from "../../util/socket";
import moment from 'moment';
import './Header.css';

const mapStateToProps = (state) => {
    return {
        login: state.login,
        notification: state.notification
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchNotifications: (login) => dispatch(fetchNotifications(login)),
    setHasNew: (status) => dispatch(setHasNew(status)),
    logOut: () => dispatch(logOut()),
    clearFilter: () => dispatch(initFilter()),
    clearChat: () => dispatch(initChat())
});

function NotificationList(props) {
    let listItems;

    if (props.notifications.length > 0) {
        listItems = props.notifications.map((notificaiton, item) => {
            const ChatMessage = notificaiton.event === 'message' ? 'New message from ' : '';
            return (
                <DropdownItem key={item}>
                    {ChatMessage}
                    <span className="nickname">{notificaiton.nickname}</span>
                    <div className="message">{notificaiton.message}</div>
                    <div className="time">{moment(notificaiton.time).fromNow()}</div>
                </DropdownItem>
            );
        }
        );
        return (
            <label>{listItems}</label>
        );
    }
    return (
        <DropdownItem>
            Nothing
        </DropdownItem>
    );
}

function Notification(props) {
    console.log('3: ', props.hasNew);
    function handleClick() {
        props.fetchNotif(props.me);
        props.set(false);
    }
    return (
        <UncontrolledButtonDropdown>
            <DropdownToggle color="none" onClick={handleClick}>
                {
                    (props.hasNew)
                        ? <span className="notification" />
                        : ''
                }
                <i className="icon fa fa-bell"></i>
            </DropdownToggle>
            <DropdownMenu modifiers={{
                setMaxHeight: {
                    enabled: true,
                    order: 890,
                    fn: (data) => {
                        return {
                            ...data,
                            styles: {
                                ...data.styles,
                                overflow: 'auto',
                                maxHeight: '350px',
                                maxWidth: '300px',
                            },
                        };
                    },
                },
            }}>
                <NotificationList notifications={props.notifications} />
            </DropdownMenu>
        </UncontrolledButtonDropdown>
    );
}

const Header = (props) => {
    const history = useHistory();
    const name = props.login.isLogged === 'true' ? <i className="fa fa-sign-out"></i> : <i className="fa fa-sign-in"></i>;
    const urls = ['/login', '/register', '/remind', '/confirm'];
    const path = props.location.pathname;
    const me = props.login.nickname;
    const isLogged = props.login.isLogged;
    const { setHasNew } = props;

    useEffect(() => {
        if (isLogged) {
            socket.emit('log_in', me);
            socket.on('new_notification', (data) => {
                if (data.you === me)
                    setHasNew(true);
            });
    
            return function unsub() {
                socket.off('new_notification');
            };
        }
        if (!isLogged && !path.includes('/register') && !path.includes('/remind') && !path.includes('/confirm'))
            history.push('/login');
    }, [path, isLogged, history, me, setHasNew]);

    return (
        <Navbar color="light" light expand="xs">
            <Container>
                <NavbarBrand>Matcha</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    {!urls.includes(path) &&
                        <NavItem>
                            <Notification 
                            me={me}
                            notifications={props.notification.notifications}
                            hasNew={props.notification.hasNew}
                            fetchNotif={props.fetchNotifications} 
                            set={props.setHasNew}/>
                        </NavItem>
                    }
                    {!urls.includes(path) &&
                        <NavItem>
                            <NavLink href="/chats">
                                <i className="fa fa-comments"></i>
                            </NavLink>
                        </NavItem>
                    }
                    {(!urls.includes(path) || path !== '/edit') && path.includes('/users/page') &&
                        <NavItem>
                            <NavLink href={`/users/${props.login.me.nickname}`}>
                                <i className="fa fa-user"></i>
                            </NavLink>
                        </NavItem>
                    }
                    {(!urls.includes(path) || path === '/edit') && !path.includes('/users/page') &&
                        <NavItem>
                            <NavLink href="/users/page/1">
                                <i className="fa fa-users"></i>
                            </NavLink>
                        </NavItem>
                    }
                    {!urls.includes(path) &&
                        <NavItem>
                            <NavLink href='/login' onClick={() => {
                                props.clearFilter();
                                props.clearChat();
                                props.logOut();
                            }}>
                                {name}
                            </NavLink>
                        </NavItem>
                    }
                </Nav>
            </Container>
        </Navbar>
    );

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));