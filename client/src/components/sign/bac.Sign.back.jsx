import React, { Component } from 'react';
import InfoToast from '../info';
import { Row, Col, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';
import { isValidInput, isValidPassword } from '../../util/check';
import { request } from '../../util/http';
import { useState } from 'react';

function InputForm(props) {
    const [isValid, toggleValid] = useState('');

    const nameChange = (e) => {
        const { name, value } = e.target;

        if (isValidInput(name, value))
            toggleValid('is-valid');
        else
            toggleValid('is-invalid');

        props.onChange(name, value);
    };

    return (
        <Col sm={6}>
            <FormGroup>
                <Label>{props.labelName}</Label>
                <Input
                    type={props.type}
                    name={props.name}
                    onChange={nameChange}
                    onBlur={props.onBlur()}
                    placeholder={props.placeholder}
                    required
                    className={isValid}
                />
                <FormFeedback>{props.feedback}</FormFeedback>
            </FormGroup>
        </Col>
    )
}

class InputFormWithFetch extends Component {
    constructor(props) {
        super(props);
        state = {
            isValid: false,
            feedback: ''
        }

        // emailChange = emailChange.bind(this);
    }

    toggle = (status) => {
        let oppStatus;

        if (status === 'Valid')
            oppStatus = 'Invalid';

        setState({
            [status]: true,
            [oppStatus]: ''
        })
    }

    checkExist = (name, value) => {
        request("/api/user/register/check/" + name + value)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error === true) {
                        toggle('Invalid');
                        setState({ feedback: name + 'is taken' })
                    }
                },
                (error) => {
                    setState({
                        isShow: true,
                        message: error,
                        icon: "danger"
                    });
                }
            )
    }

    inputChange = (e) => {
        const { name, value } = e.target;
        if (isValidInput(name, value) === true) {
            toggle('Valid');
            checkExist(name, value);
        }

        else {
            toggle('Invalid');
            setState({ feedback: name + ' is invalid' })
        }

        props.onChange(e.target.name, e.target.value);
    };

    render() {
        const { isValid, feedback } = state;

        return (
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>{props.labelName}</Label>
                        <Input
                            type="text"
                            name={props.labelName}
                            onChange={inputChange}
                            onBlur={() => props.onBlur()}
                            placeholder={props.placeholder}
                            required
                            invalid={!isValid}
                            valid={isValid}
                        />
                        <FormFeedback>{feedback}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
        )
    }
}

class Password extends Component {
    constructor(props) {
        super(props);
        state = {
            passwordValid: false,
            passwordInvalid: false,
            repasswordValid: false,
            repasswordInvalid: false
        }

        // passChange = passChange.bind(this);
    }

    toggle = (name, status) => {
        let oppStatus;
        if (status === 'Valid')
            oppStatus = 'Invalid';

        const oppName = name + oppStatus;
        name = name + status;

        setState({
            [name]: true,
            [oppName]: false
        });
    }

    passChange = (e) => {
        const { name, value } = e.target;

        if (name === 'password') {
            props.onChange(name, value);

            if (isValidPassword(value) === true)
                toggle(name, 'Valid')
            else
                toggle(name, 'Invalid')
        }
        else {
            const password = document.querySelector('input[name="password"]').value;

            if (password === value)
                toggle(name, 'Valid')
            else
                toggle(name, 'Invalid')
        }
    };

    render() {
        const { passwordInvalid, passwordValid, repasswordInvalid, repasswordValid } = state;

        if (sessionStorage.getItem('isLogged') === 'true')
            // history.push('/login')

            return (
                <Row>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                id="1"
                                type="password"
                                name='password'
                                onChange={passChange}
                                onBlur={() => props.onBlur()}
                                placeholder="Str0ngPa55%"
                                required
                                invalid={passwordInvalid}
                                valid={passwordValid}
                            />
                            <FormFeedback>Too weak password. 8 symbols is required</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col sm={6}>
                        <FormGroup>
                            <Label>Re-Password</Label>
                            <Input
                                type="password"
                                name='repassword'
                                onChange={passChange}
                                onBlur={() => props.onBlur()}
                                placeholder="Str0ngPa55%"
                                required
                                invalid={repasswordInvalid}
                                valid={repasswordValid}
                            />
                            <FormFeedback>Password doesn't match</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
            )
    }
}

function SignUpBtn() {
    return (
        <Col>
            <Button className="btn btn" color="primary" type="submit" disabled={props.isActiveBtn} >Sign Up</Button>
        </Col>
    )
}

const Sign = (props) => {
    const [isActiveBtn, toggleBtn] = useState(false);

    handleSubmit = (event) => {
        event.preventDefault();
        const { lastName, firstName, email, password } = state;

        let data = {
            lastName: lastName,
            firstName: firstName,
            email: email,
            password: password
        }

        request("api/user/register", data, 'POST')
            .then(res => res.json())
            .then(
                (result) => {
                    setState({
                        isShow: true,
                        message: result.message,
                        icon: "success"
                    });
                    // history.push('/');
                },
                (error) => {
                    setState({
                        isShow: true,
                        message: error,
                        icon: "danger"
                    });
                }
            )
    }

    checkBtn = () => {
        const countValidInputs = document.querySelectorAll(".is-valid").length;
        const countInvalidInputs = document.querySelectorAll(".is-invalid").length;

        if (countValidInputs === 5 && countInvalidInputs === 0)
            toggleBtn(false);
        else
            toggleBtn(true);
    }

    const { isActiveBtn, isShow, icon, message } = state;

    return (
        <Row>
            <Col md={8} className="m-auto">
                <form onSubmit={handleSubmit}>
                    <Row>
                        <InputForm onChange={handleChange} onBlur={checkBtn} labelName='Last name' name='lastName' placeholder='Ng' type='text' feedback='Only symbols are required' />
                        <InputForm onChange={handleChange} onBlur={checkBtn} labelName='First name' name='firstName' placeholder='Duong' type='text' feedback='Only symbols are required' />
                    </Row>
                    <InputForm onChange={handleChange} onBlur={checkBtn} labelName='Date birth' name='birthDate' type='date' feedback='You too young for this' />
                    <InputFormWithFetch onChange={handleChange} onBlur={checkBtn} labelName='Email' placeholder='rkina@mail.ru' />
                    <InputFormWithFetch onChange={handleChange} onBlur={checkBtn} labelName='Login' placeholder='rkina7' />
                    {/* <Password onChange={handleChange} onBlur={checkBtn} /> */}
                    <SignUpBtn isActiveBtn={isActiveBtn} onBlur={checkBtn} />
                </form>
            </Col>
        </Row>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sign));