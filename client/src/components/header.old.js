import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../redux/login/ActionCreators';

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut())
});

function InOut(props) {
    const isLogged = props.isLogged;
    const location = window.location.pathname;
    const name = isLogged === true ? <i className="fa fa-sign-out"></i> : <i className="fa fa-sign-in"></i>;

    if (location === '/login')
        return (
            <NavItem>

            </NavItem>
        )

    return (
        <NavItem>
            <NavLink href='/login' onClick={props.logOut}>
                {name}
            </NavLink>
        </NavItem>
    );
}

const Header = (props) => {

    return (
        <Navbar color="light" light expand="xs">
            <Container>
                <NavbarBrand href="/users">Matcha</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/#">
                            <i className="fa fa-bell"></i>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/users">
                            <i className="fa fa-home"></i>
                        </NavLink>
                    </NavItem>
                    <InOut onClick={props.logOut} />
                </Nav>
            </Container>
        </Navbar>
    );
}a

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));