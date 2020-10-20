import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    inOut = () => {
        const isLogged = sessionStorage.getItem('isLogged');
        const location = window.location.pathname;
        // const name = isLogged === 'true' ? 'Out' : 'In';
        const name = isLogged === 'true' ? <i className="fa fa-sign-out"></i> : <i className="fa fa-sign-in"></i>;

        if (location === '/login')
            return;

        return (
            <NavItem>
                <NavLink href='/login' onClick={() => sessionStorage.setItem('isLogged', false)}>
                    {name}
                </NavLink>
            </NavItem>
        );
    }

    render() {
        return (
            <Navbar color="light" light expand="xs">
                <Container>
                    <NavbarBrand href="/">Matcha</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/#">
                                <i className="fa fa-bell"></i>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/">
                                <i className="fa fa-home"></i>
                            </NavLink>
                        </NavItem>
                        {this.inOut()}
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default Header;