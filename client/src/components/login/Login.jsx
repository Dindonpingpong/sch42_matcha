import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { useState } from 'react';
import { fetchLogin, setEmail, setPassword } from '../../redux/login/ActionCreators';
import { isValidInput, isValidPassword } from '../../util/check';
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchLogin: (email, password) => dispatch(fetchLogin(email, password)),
    setEmail: (email) => dispatch(setEmail(email)),
    setPassword: (password) => dispatch(setPassword(password))
});

function Email(props) {
    const [valid, setValid] = useState(false);
    const [inValid, setInvalid] = useState(false);

    const emailChange = (e) => {
        const { name, value } = e.target;

        if (isValidInput(name, value)) {
            props.setEmail(value);

            setInvalid(false);
            setValid(true);
        }
        else {
            setInvalid(true);
            setValid(false);
        }
    }

    return (
        <Col>
            <FormGroup>
                <Label>Email address</Label>
                <Input
                    type="text"
                    name="Email"
                    onChange={emailChange}
                    placeholder="email@example.com"
                    required
                    valid={valid}
                    invalid={inValid}
                />
            </FormGroup>
        </Col>
    )
}

function Password(props) {
    const [valid, setValid] = useState(false);
    const [inValid, setInvalid] = useState(false);

    const passChange = (e) => {
        const { value } = e.target;

        if (isValidPassword(value)) {
            props.setPass(value);

            setInvalid(false);
            setValid(true);
        }
        else {
            setInvalid(true);
            setValid(false);
        }
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
                    valid={valid}
                    invalid={inValid}
                />
            </FormGroup>
        </Col>
    )
}

function Login(props) {
    const history = useHistory();

    const Sign = () => {
        const { email, password } = props.login;

        props.fetchLogin(email, password);
        console.log(props.login);
    }

    if (props.login.isLogged) {
        history.push("/");
    }

    return (
        <Row>
            <Col md={6} className="m-auto">
                <Alert color="primary" isOpen={true}>
                    {props.login.me.nickname}
                </Alert>
                {/* <InfoToast isShow={this.state.isShow} message={this.state.message} onClick={this.handleToast} /> */}
                <form >
                    <Email setEmail={props.setEmail} />
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
