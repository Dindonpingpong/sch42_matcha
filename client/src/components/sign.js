import React, { Component } from 'react';
import InfoToast from './info';
import { Row, Col, FormGroup, Label, Input, FormFeedback, Button } from 'reactstrap';
import history from '../history';
import { isValidInput, isValidPassword } from '../util/check';
import { request } from '../util/http';

class InputForm extends Component {
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

        if (isValidInput(name, value))
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
                        type={this.props.type}
                        name={this.props.name}
                        onChange={this.nameChange}
                        onBlur={() => this.props.onBlur()}
                        placeholder={this.props.placeholder}
                        required
                        invalid={Invalid}
                        valid={Valid}
                    />
                    <FormFeedback>{this.props.feedback}</FormFeedback>
                </FormGroup>
            </Col>
        )
    }
}

class InputFormWithFetch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Invalid: false,
            Valid: false,
            feedback: ''
        }

        // this.emailChange = this.emailChange.bind(this);
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

    checkExist = (name, value) => {
        request("/api/user/register/check/" + name + value)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.error === true) {
                        this.toggle('Invalid');
                        this.setState({ feedback: name + 'is taken' })
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
        if (isValidInput(name, value) === true) {
            this.toggle('Valid');
            this.checkExist(name, value);
        }

        else {
            this.toggle('Invalid');
            this.setState({ feedback: name + ' is invalid' })
        }

        this.props.onChange(e.target.name, e.target.value);
    };

    render() {
        const { Invalid, Valid, feedback } = this.state;

        return (
            <Row>
                <Col sm={6}>
                    <FormGroup>
                        <Label>{this.props.labelName}</Label>
                        <Input
                            type="text"
                            name={this.props.labelName}
                            onChange={this.emailChange}
                            onBlur={() => this.props.onBlur()}
                            placeholder={this.props.placeholder}
                            required
                            invalid={Invalid}
                            valid={Valid}
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
                    // history.push('/');
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
                            <InputForm onChange={this.handleChange} onBlur={this.checkBtn} labelName='Last name' name='lastName' placeholder='Ng' type='text' feedback='Only symbols are required'/>
                            <InputForm onChange={this.handleChange} onBlur={this.checkBtn} labelName='First name' name='firstName' placeholder='Duong' type='text' feedback='Only symbols are required'/>
                        </Row>
                        <InputForm onChange={this.handleChange} onBlur={this.checkBtn} labelName='Date birth' name='birthDate' type='date' feedback='You too young for this'/>
                        <InputFormWithFetch onChange={this.handleChange} onBlur={this.checkBtn} labelName='Email' placeholder='rkina@mail.ru'/>
                        <InputFormWithFetch onChange={this.handleChange} onBlur={this.checkBtn} labelName='Login' placeholder='rkina7'/>
                        {/* <Password onChange={this.handleChange} onBlur={this.checkBtn} /> */}
                        <SignUpBtn isActiveBtn={isActiveBtn} onBlur={this.checkBtn} />
                    </form>
                </Col>
            </Row>
        )
    }
}

export default Sign;