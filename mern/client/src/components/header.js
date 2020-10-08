import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

class Header extends Component {

    render() {
        const test = true;

        return (
            <Navbar color="light" light expand="xs">
                <div className="container">
                    <NavbarBrand href="/">Matcha</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/people">People</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap" disabled={test}>GitHub</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/components/">Out</NavLink>
                        </NavItem>
                    </Nav>
                </div>
            </Navbar>
        )
    }
}

export default Header;