import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { useState } from 'react';
import { fetchLogin, setLogin, setPassword } from '../../redux/login/ActionCreators';
import { isValidInput, isValidPassword } from '../../util/check';
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchLogin: (login, password) => dispatch(fetchLogin(login, password)),
    setLogin: (login) => dispatch(setLogin(login)),
    setPassword: (password) => dispatch(setPassword(password))
});

function LoginInput(props) {
    const [isValid, toggleValid] = useState('');

    const loginChange = (e) => {
        const { name, value } = e.target;

        if (isValidInput(name, value)) {
            toggleValid('is-valid');
            props.setLogin(value);
        }
        else
            toggleValid('is-invalid');
    }

    return (
        <Col>
            <FormGroup>
                <Label>Login</Label>
                <Input
                    type="text"
                    name="Login"
                    onChange={loginChange}
                    placeholder="rkina7"
                    required
                    className={isValid}
                />
            </FormGroup>
        </Col>
    )
}

function Password(props) {
    const [isValid, toggleValid] = useState('');

    const passChange = (e) => {
        const { value } = e.target;

        if (isValidPassword(value)) {
            toggleValid('is-valid');
            props.setPass(value);
        }
        else
            toggleValid('is-invalid');
    }

    return (
        <Col>
            <FormGroup>
                <Label>Password</Label>
                <Input
                    type="password"
                    name='password'
                    onChange={passChange}
                    placeholder="Str0ngPa55%"
                    required
                    className={isValid}
                />
            </FormGroup>
        </Col>
    )
}

function Login(props) {
    const history = useHistory();

    const Sign = () => {
        const { nickname, password } = props.login;

        props.fetchLogin(nickname, password);
    }

    if (props.login.isLogged) {
        history.push("/users/page/1");
    }

    return (
        <Row>
            <Col md={6} className="m-auto">
                <form >
                    <LoginInput setLogin={props.setLogin} />
                    <Password setPass={props.setPassword} />
                    <Col>
                        <Button color="primary" onClick={Sign} >Sign in</Button>
                    </Col>
                </form>
                <Col>
                    <div className="dropdown-divider"></div>
                    <NavLink href='/register' >Newbee? Sign up</NavLink>
                    <NavLink href='/remind' >Forgot pass? Remind</NavLink>
                </Col>
            </Col>
        </Row>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
