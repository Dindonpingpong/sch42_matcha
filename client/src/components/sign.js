import React, { Component } from 'react';
import InfoToast from './info';
import { Row, Col, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';
import history from '../history';
import { isValidName, isValidEmail, isValidPassword } from '../util/check';
import { request } from '../util/http';

class NameInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Invalid: false,
            Valid: false,
        }

        // this.nameChange = this.nameChange.bind(this);
    }

    toggle = (status) => {
        let oppStatus;

        if (status === 'Valid')
            oppStatus = 'Invalid';

        this.setState({
            [status]: true,
            [oppStatus]: ''
        })
    }

    nameChange = (e) => {
        const { name, value } = e.target;

        if (isValidName(value) === true)
            this.toggle('Valid');
        else
            this.toggle('Invalid');

        this.props.onChange(name, value);
    };

    render() {
        const { Invalid, Valid } = this.state;

        return (
            <Col sm={6}>
                <FormGroup>
                    <Label>{this.props.labelName}</Label>
                    <Input
                        type="text"
                        name={this.props.name}
                        onChange={this.nameChange}
                        onBlur={() => this.props.onBlur()}
                        placeholder={this.props.placeholder}
                        required
                        invalid={Invalid}
                        valid={Valid}
                    />
                    <FormFeedback>Only symbols are required</FormFeedback>
                </FormGroup>
            </Col>
        )
    }
}

class LoginName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailInvalid: false,
            emailValid: false,
            feedback: ''
        }

        // this.emailChange = this.emailChange.bind(this);
    }

    toggle = (name, status) => {
        let oppStatus;
        if (status === 'Valid')
            oppStatus = 'Invalid';

        const oppName = name + oppStatus;
        name = name + status;

        this.setState({
            [name]: true,
            [oppName]: false
        });
    }

    checkExist = (name, value) => {
        request("api/user/register/check/" + value)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error === true) {
                        this.toggle(name, 'Invalid');
                        this.setState({ feedback: 'Email is already taken' })
                    }
                },
                (error) => {
                    this.setState({
                        isShow: true,
                        message: error,
                        icon: "danger"
                    });
                }
            )
    }

    emailChange = (e) => {
        const { name, value } = e.target;

        if (isValidEmail(value) === true) {
            this.toggle(name, 'Valid');
            this.checkExist(name, value);
        }

        else {
            this.toggle(name, 'Invalid');
            this.setState({ feedback: 'Invalid email' })
        }

        this.props.onChange(e.target.name, e.target.value);
    };

    render() {
        const { emailInvalid, emailValid, feedback } = this.state;

        return (
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="text"
                            name='email'
                            onChange={this.emailChange}
                            onBlur={() => this.props.onBlur()}
                            placeholder="rkina7@gmail.com"
                            required
                            invalid={emailInvalid}
                            valid={emailValid}
                        />
                        <FormFeedback>{feedback}</FormFeedback>
                    </FormGroup>
                </Col>
            </Row>
        )
    }
}

class Email extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailInvalid: false,
            emailValid: false,
            feedback: ''
        }

        // this.emailChange = this.emailChange.bind(this);
    }

    toggle = (name, status) => {
        let oppStatus;
        
        if (status === 'Valid')
            oppStatus = 'Invalid';

        const oppName = name + oppStatus;
        name = name + status;

        this.setState({
            [name]: true,
            [oppName]: false
        });
    }

    checkExist = (name, value) => {
        request("api/user/register/check/" + value)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error === true) {
                        this.toggle(name, 'Invalid');
                        this.setState({ feedback: 'Email is already taken' })
                    }
                },
                (error) => {
                    this.setState({
                        isShow: true,
                        message: error,
                        icon: "danger"
                    });
                }
            )
    }

    emailChange = (e) => {
        const { name, value } = e.target;

        if (isValidEmail(value) === true) {
            this.toggle(name, 'Valid');
            this.checkExist(name, value);
        }

        else {
            this.toggle(name, 'Invalid');
            this.setState({ feedback: 'Invalid email' })
        }

        this.props.onChange(e.target.name, e.target.value);
    };

    render() {
        const { emailInvalid, emailValid, feedback } = this.state;

        return (
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input
                            type="text"
                            name='email'
                            onChange={this.emailChange}
                            onBlur={() => this.props.onBlur()}
                            placeholder="rkina7@gmail.com"
                            required
                            invalid={emailInvalid}
                            valid={emailValid}
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
        this.state = {
            passwordValid: false,
            passwordInvalid: false,
            repasswordValid: false,
            repasswordInvalid: false
        }

        // this.passChange = this.passChange.bind(this);
    }

    toggle = (name, status) => {
        let oppStatus;
        if (status === 'Valid')
            oppStatus = 'Invalid';

        const oppName = name + oppStatus;
        name = name + status;

        this.setState({
            [name]: true,
            [oppName]: false
        });
    }

    passChange = (e) => {
        const { name, value } = e.target;

        if (name === 'password') {
            this.props.onChange(name, value);

            if (isValidPassword(value) === true)
                this.toggle(name, 'Valid')
            else
                this.toggle(name, 'Invalid')
        }
        else {
            const password = document.querySelector('input[name="password"]').value;

            if (password === value)
                this.toggle(name, 'Valid')
            else
                this.toggle(name, 'Invalid')
        }
    };

    render() {
        const { passwordInvalid, passwordValid, repasswordInvalid, repasswordValid } = this.state;

        if (sessionStorage.getItem('isLogged') === 'true')
            history.push('/login')

        return (
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            id="1"
                            type="password"
                            name='password'
                            onChange={this.passChange}
                            onBlur={() => this.props.onBlur()}
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
                            onChange={this.passChange}
                            onBlur={() => this.props.onBlur()}
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

class SignUpBtn extends Component {

    render() {
        return (
            <Col>
                <Button className="btn btn" color="primary" type="submit" disabled={this.props.isActiveBtn} >Sign Up</Button>
            </Col>
        )
    }
}

class Sign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActiveBtn: true,
            isShow: false,
            lastName: '',
            firstName: '',
            email: '',
            password: ''
        };

        // Без этого работает, но в документации сказано, что не будет
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { lastName, firstName, email, password } = this.state;

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
                    this.setState({
                        isShow: true,
                        message: result.message,
                        icon: "success"
                    });
                    history.push('/');
                },
                (error) => {
                    this.setState({
                        isShow: true,
                        message: error,
                        icon: "danger"
                    });
                }
            )
    }

    handleChange = (name, value) => { this.setState({ [name]: value }) };

    handleToast = () => { this.setState({ isShow: false }) };

    checkBtn = () => {
        const countValidInputs = document.querySelectorAll(".is-valid").length;
        const countInvalidInputs = document.querySelectorAll(".is-invalid").length;

        if (countValidInputs === 5 && countInvalidInputs === 0)
            this.setState({ isActiveBtn: false });
        else
            this.setState({ isActiveBtn: true });
    }

    render() {
        const { isActiveBtn, isShow, icon, message } = this.state;

        return (
            <Row>
                <Col md={8} className="m-auto">
                    <InfoToast isShow={isShow} icon={icon} message={message} onClick={this.handleToast} />
                    <form onSubmit={this.handleSubmit}>
                        <Row>
                            <NameInputForm onChange={this.handleChange} onBlur={this.checkBtn} labelName='Last name' name='lastName' placeholder='Ng' />
                            <NameInputForm onChange={this.handleChange} onBlur={this.checkBtn} labelName='First name' name='firstName' placeholder='Duong' />
                        </Row>
                        <Email onChange={this.handleChange} onBlur={this.checkBtn} />
                        <LoginName onChange={this.handleChange} onBlur={this.checkBtn} />
                        <Password onChange={this.handleChange} onBlur={this.checkBtn} />
                        <SignUpBtn isActiveBtn={isActiveBtn} onBlur={this.checkBtn} />
                    </form>
                </Col>
            </Row>
        )
    }
}

export default Sign;