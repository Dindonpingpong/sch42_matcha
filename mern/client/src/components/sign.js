import React, { Component } from 'react';
import InfoToast from './info';
// import history from '../history';

class Name extends Component {
    constructor(props) {
        super(props);
        this.nameChange = this.nameChange.bind(this);
    }

    nameChange = (e) => { this.props.onChange(e.target.name, e.target.value) };

    render() {
        return (
            <div className="form-row col-12">
                <div className="col-md-6">
                    <label htmlFor="validationServer01">Last name</label>
                    <input type="text" name='lastName' className="form-control" onChange={this.nameChange} data-validator="letters" placeholder="Ng" required />
                    {/* state  */}
                    <div className="invalid-feedback">
                        Only symbols are required
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationServer02">First name</label>
                    <input type="text" name='firstName' className="form-control" onChange={this.nameChange} data-validator="letters" placeholder="Duong" required />
                    {/* state  */}
                    <div className="invalid-feedback">
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
            <div className="form-row col-12">
                <div className="col-12">
                    <label htmlFor="validationServer03">Email</label>
                    <input type="text" name='email' onChange={this.emailChange} className="form-control" data-validator="email"
                        aria-describedby="validationServer03Feedback" placeholder="rkina7@gmail.com" required />
                    {/* state */}
                    <div id="validationServer03Feedback" className="invalid-feedback">
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
            <div className="form-row col-12">
                <div className="col-md-6">
                    <label htmlFor="validationServer01">Password</label>
                    <input type="password" name='password' onChange={this.passChange} className="form-control" data-validator="password"
                        placeholder="Str0ngPa55%" required />
                    {/* state  */}
                    <div className="invalid-feedback">
                        Too weak password
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationServer02">Repeat Password</label>
                    <input type="password" name='repassword' onChange={this.passChange} className="form-control" data-validator="repass"
                        placeholder="Str0ngPa55%" required />
                    {/* state  */}
                    <div className="invalid-feedback">
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
            <div className="col-12 mt-3">
                <button className="btn btn-primary" type='submit' >Sign Up</button>
            </div>
        )
    }
}

class Sign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
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

    handleSubmit = (event) => {
        event.preventDefault();
        const { lastName, firstName, email, password } = this.state;

        let data = {
            lastName: lastName,
            firstName: firstName,
            email: email,
            password: password
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        fetch("api/user/register", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isShow: true,
                        message: result.message,
                        icon: "success"
                    });
                    // history.push('/'); redirect or not
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

    handleToast = () => this.setState({
        isShow: false
    });


    render() {
        const { isShow, icon, message } = this.state;

        return (
            <div className='row col-md-8 m-auto'>
                <InfoToast isShow={isShow} icon={icon} message={message} onClick={this.handleToast} />
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