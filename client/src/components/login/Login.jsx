import React, { useEffect } from 'react';
<<<<<<< HEAD
import { useParams, withRouter } from 'react-router-dom';
=======
import { withRouter } from 'react-router-dom';
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
import { connect } from 'react-redux';
import { Row, Col, Button, FormGroup, Label, Input, Alert } from 'reactstrap';
import { NavLink } from 'reactstrap';
import { useState } from 'react';
import { fetchLogin, setLogin, setPassword } from '../../redux/login/ActionCreators';
import { isValidInput, isValidPassword } from '../../util/check';
import { useHistory } from "react-router-dom";
import { Loading } from '../Loading';
import { request } from '../../util/http';

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
                    name="login"
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
    const { nickname, hash } = useParams();
    const [msg, setMsg] = useState(null);
    const history = useHistory();

    const Sign = () => {
        const { nickname, password } = props.login;

        props.fetchLogin(nickname, password);
    }

    useEffect(() => {
        if (props.login.isLogged) {
            history.push("/users/page/1");
        }
    }, [props.login.isLogged]);

    if (props.login.isLoading) {
        return (
            <Loading />
        )
    }

    if (nickname, hash) {
        const data = {
            nickname: nickname,
            hash: hash
        };

        request('/api/user/confirm', data, "POST")
            .then(res => res.json())
            .then((result) => {
                setMsg(result.msg)
            })
            .catch((e) => {
                setMsg(e.message)
            })
    }

    return (
        <Row>
            <Col md={6} className="m-auto">
                {
<<<<<<< HEAD
                    (props.login.errMsg || msg) &&
                <Alert color='danger' >{props.login.errMsg}{msg}</Alert>
=======
                    props.login.errMsg &&
                    <Alert color='danger' >{props.login.errMsg}</Alert>
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
                }
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
