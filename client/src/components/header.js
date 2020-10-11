import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
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
        const name = isLogged === 'true' ? 'Out' : 'In';

        if (location === '/login')
            return

        return (
            <NavItem>
                <NavLink
                    href='/login'
                    onClick={ () => sessionStorage.setItem('isLogged', false) }
                >
                    {name}
                </NavLink>
            </NavItem>
        )
    }

    render() {
        return (
            <Navbar color="light" light expand="xs">
                <div className="container">
                    <NavbarBrand href="/">Matcha</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/">Users</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap" disabled={true}>GitHub</NavLink>
                        </NavItem>
                        {this.inOut()}
                    </Nav>
                </div>
            </Navbar>
        )
    }
}

export default Header;