import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from 'reactstrap';
import InfoToast from './info';

class Email extends Component {
    constructor(props) {
        super(props);

        this.emailChange = this.emailChange.bind(this);
    }

    emailChange = (e) => { this.props.onChange(e.target.name, e.target.value) };

    render() {
        return (
            <div className="col-12">
                <div className="form-group">
                    <Label>Email address</Label>
                    <Input
                        type="text"
                        name="email"
                        onChange={this.emailChange}
                        placeholder="email@example.com"
                        required
                    />
                </div>
            </div>
        )
    }
}

class Password extends Component {
    constructor(props) {
        super(props);

        this.passwordChange = this.passwordChange.bind(this);
    }

    passwordChange = (e) => { this.props.onChange(e.target.name, e.target.value) };

    render() {
        return (
            <div className="col-12">
                <div className="form-group">
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            name='password'
                            onChange={this.passwordChange}
                            placeholder="Str0ngPa55%"
                            required
                        />
                    </FormGroup>
                </div>
            </div>
        )
    }
}

class SignInBtn extends Component {
    render() {
        return (
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
        )
    }
}

class SignUpBtn extends Component {
    render() {
        return (
            <div className="col-12">
                <div className="dropdown-divider"></div>
                <NavLink href='/register' >Newbee? Sign up</NavLink>
                <NavLink href='/remind' >Forgot pass? Remind</NavLink>
            </div>
        )
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            email: '',
            password: ''
        };

        // this.loggedIn = sessionStorage.getItem('isLogged') === 'true';
        // Без этого работает, но в документации сказано, что не будет
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        if (email === '' || password === '') {
            this.setState({
                isShow: true,
                message: "Wow",
                icon: "danger"
            });
            return
        }

        let data = {
            email: email,
            password: password
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch("api/user/login", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isShow: true,
                        message: result.message,
                        icon: "success"
                    });
                    // if (result.error === false)
                    sessionStorage.setItem('isLogged', true);
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

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    handleToast = () => this.setState({
        isShow: false
    });

    render() {
        return (
            <div className='row col-md-6 m-auto'>
                <InfoToast isShow={this.state.isShow} message={this.state.message} onClick={this.handleToast} />
                <form onSubmit={this.handleSubmit}>
                    <Email onChange={this.handleChange} />
                    <Password onChange={this.handleChange} />
                    <SignInBtn />
                </form>
                <SignUpBtn />
            </div>
        )

    }
}

export default Login;
