import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOut } from '../redux/login/ActionCreators';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import { initFilter } from '../redux/filter/ActionCreators';

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(logOut()),
    clearFilter: () => dispatch(initFilter())
});

const Header = (props) => {
    const history = useHistory();
    const name = props.login.isLogged === 'true' ? <i className="fa fa-sign-out"></i> : <i className="fa fa-sign-in"></i>;
    const urls = ['/login', '/register', '/remind', '/confirm'];
    const path = props.location.pathname;

    useEffect(() => {
        if (!props.login.isLogged && !path.includes('/register') && !path.includes('/remind') && !path.includes('/confirm'))
            history.push('/login');
    }, [path]);

    return (
        <Navbar color="light" light expand="xs">
            <Container>
                <NavbarBrand>Matcha</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    {!urls.includes(path) &&
                        <NavItem>
                            <NavLink href="/#">
                                <i className="fa fa-bell"></i>
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