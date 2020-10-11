import React, { Component } from 'react';
import InfoToast from './info';
import { FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';
import history from '../history';
import { isValidName, isValidEmail, isValidPassword } from '../util/check';
import { request } from '../util/http';

class Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastNameInvalid: false,
            lastNameValid: false,
            firstNameInvalid: false,
            firstNameValid: false,
        }

        // this.nameChange = this.nameChange.bind(this);
    }

    toggle = (name, status) => {
        let oppStatus;

        if (status === 'Valid')
            oppStatus = 'Invalid';

        const oppName = name + oppStatus;
        name = name + status;

        this.setState({
            [name]: true,
            [oppName]: ''
        })
    }

    nameChange = (e) => {
        const { name, value } = e.target;


        if (isValidName(value) === true)
            this.toggle(name, 'Valid');
        else
            this.toggle(name, 'Invalid');

        this.props.onChange(name, value);
    };

    render() {
        const { lastNameInvalid, lastNameValid, firstNameInvalid, firstNameValid } = this.state;

        return (
            <div className="form-row col-12">
                <div className="col-md-6">
                    <FormGroup>
                        <Label>Last name</Label>
                        <Input
                            type="text"
                            name='lastName'
                            onChange={this.nameChange}
                            onBlur={() => this.props.onBlur()}
                            placeholder="Ng"
                            required
                            invalid={lastNameInvalid}
                            valid={lastNameValid}
                        />
                        <FormFeedback>Only symbols are required</FormFeedback>
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup>
                        <Label>First name</Label>
                        <Input
                            type="text"
                            name='firstName'
                            onChange={this.nameChange}
                            onBlur={() => this.props.onBlur()}
                            placeholder="Duong"
                            required
                            invalid={firstNameInvalid}
                            valid={firstNameValid}
                        />
                        <FormFeedback>Only symbols are required</FormFeedback>
                    </FormGroup>
                </div>
            </div>
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
            <div className="form-row col-12">
                <div className="col-12">
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
                </div>
            </div>
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
            <div className="form-row col-12">
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
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
                </div>
            </div>
        )
    }
}

class SignUpBtn extends Component {

    render() {
        return (
            <div className="col-12 mt-3">
                <Button className="btn btn" color="primary" type="submit" disabled={this.props.isActiveBtn} >Sign Up</Button>
            </div>
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
            <div className='row col-md-8 m-auto'>
                <InfoToast isShow={isShow} icon={icon} message={message} onClick={this.handleToast} />
                <form onSubmit={this.handleSubmit}>
                    <Name onChange={this.handleChange} onBlur={this.checkBtn} />
                    <Email onChange={this.handleChange} onBlur={this.checkBtn} />
                    <Password onChange={this.handleChange} onBlur={this.checkBtn} />
                    <SignUpBtn isActiveBtn={isActiveBtn} onBlur={this.checkBtn} />
                </form>
            </div>
        )
    }
}

export default Sign;