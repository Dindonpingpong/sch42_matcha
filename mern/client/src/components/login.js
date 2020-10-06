import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ErrorToast from './error';

class Email extends Component {
    render() {
        return (
            <div className="col-12">
                <div className="form-group">
                    <label for="exampleDropdownFormEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                </div>
            </div>
        )
    }
}

class Password extends Component {
    render() {
        return (
            <div class="col-12">
                <div class="form-group">
                    <label for="exampleDropdownFormPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                </div>
            </div>
        )
    }
}

class SignInBtn extends Component {
    render() {
        return (
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
        )
    }
}

class SignUpBtn extends Component {
    render() {
        return (
            <div class="col-12">
                <div class="dropdown-divider"></div>
                <Link to='/register'>
                    Newbee? Sign up
                </Link>
                {/* <a class="dropdown-item" href="/register">Newbee? Sign up</a> */}
                {/* <a class="dropdown-item" href="remind.html">Forgot password?</a> */}
            </div>
        )
    }
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: true,
            errMessage: "Ooopsy",
        };
    }

    handleSubmit = () => this.setState({
        isError: false,
        errMessage: "Wow is clicked"
    });

    render() {
        return (
            <div className='row col-md-6 m-auto'>
                <ErrorToast isError={this.state.isError} errMessage={this.state.errMessage} onClick={this.handleSubmit} />
                <Email />
                <Password />
                <SignInBtn />
                <SignUpBtn />
            </div>
        )
    }
}

export default Login;
