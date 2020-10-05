import React, { Component } from 'react';
import ErrorToast from './error';

class Name extends Component {
    constructor(props) {
        super(props);
        this.nameChange = this.nameChange.bind(this);
    }

    nameChange = (e) => { this.props.onChange(e.target.name, e.target.value) };

    render() {
        return (
            <div class="form-row col-12">
                <div class="col-md-6">
                    <label for="validationServer01">Last name</label>
                    <input type="text" name='lastName' class="form-control" onChange={this.nameChange} data-validator="letters" placeholder="Ng" required />
                    {/* state  */}
                    <div class="invalid-feedback">
                        Only symbols are required
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationServer02">First name</label>
                    <input type="text" name='firstName' class="form-control" onChange={this.nameChange} data-validator="letters" placeholder="Duong" required />
                    {/* state  */}
                    <div class="invalid-feedback">
                        Only symbols are required
                    </div>
                </div>
            </div>
        )
    }
}

class Email extends Component {
    constructor(props) {
        super(props);
        this.emailChange = this.emailChange.bind(this);
    }

    emailChange = (e) => { this.props.onChange(e.target.name, e.target.value) };

    render() {
        return (
            <div class="form-row col-12">
                <div class="col-12">
                    <label for="validationServer03">Email</label>
                    <input type="text" name='email' onChange={this.emailChange} class="form-control" data-validator="email"
                        aria-describedby="validationServer03Feedback" placeholder="rkina7@gmail.com" required />
                    {/* state */}
                    <div id="validationServer03Feedback" class="invalid-feedback">
                        Incorrect email
                    </div>
                </div>
            </div>
        )
    }
}

class Password extends Component {
    constructor(props) {
        super(props);

        this.passChange = this.passChange.bind(this);
    }

    passChange = (e) => {
        this.props.onChange(e.target.name, e.target.value);
    };

    render() {
        return (
            <div class="form-row col-12">
                <div class="col-md-6">
                    <label for="validationServer01">Password</label>
                    <input type="password" name='password' onChange={this.passChange} class="form-control" data-validator="password"
                        placeholder="Str0ngPa55%" required />
                    {/* state  */}
                    <div class="invalid-feedback">
                        Too weak password
                    </div>
                </div>
                <div class="col-md-6">
                    <label for="validationServer02">Repeat Password</label>
                    <input type="password" name='repassword' onChange={this.passChange} class="form-control" data-validator="repass"
                        placeholder="Str0ngPa55%" required />
                    {/* state  */}
                    <div class="invalid-feedback">
                        Password doesn't match
                    </div>
                </div>
            </div>
        )
    }
}

class SignUpBtn extends Component {
    render() {
        return (
            <div class="col-12 mt-3">
                <button class="btn btn-primary" type='submit' >Sign Up</button>
            </div>
        )
    }
}

class Sign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            repassword: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        let data = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            email: this.state.email,
            password: this.state.password
        }
        data = JSON.stringify(data)
        fetch("/api/user/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isError: result.error,
                        errMessage: result.errMessage
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }

    render() {
        return (
            <div className='row col-md-8 m-auto'>
                <ErrorToast isError={this.state.isError} errMessage={this.state.errMessage} onClick={this.handleSubmit} />
                <form onSubmit={this.handleSubmit}>
                    <Name onChange={this.handleChange} />
                    <Email onChange={this.handleChange} />
                    <Password onChange={this.handleChange} />
                    <SignUpBtn onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}

export default Sign;