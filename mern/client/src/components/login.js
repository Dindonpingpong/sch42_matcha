import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import InfoToast from './info';

class Email extends Component {
    render() {
        return (
            <div className="col-12">
                <div className="form-group">
                    <label htmlFor="exampleDropdownFormEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                </div>
            </div>
        )
    }
}

class Password extends Component {
    render() {
        return (
            <div className="col-12">
                <div className="form-group">
                    <label htmlFor="exampleDropdownFormPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
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
            isShow: false
        };
    }

    

    handleSubmit = () => this.setState({
        isShow: false
    });

    render() {
        return (
            <div className='row col-md-6 m-auto'>
                <InfoToast isShow={this.state.isShow} message={this.state.errMessage} onClick={this.handleSubmit} />
                <Email />
                <Password />
                <SignInBtn />
                <SignUpBtn />
            </div>
        )
    }
}

export default Login;
