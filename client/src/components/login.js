import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from 'reactstrap';
import InfoToast from './info';

function Email(props) {
    return (
        <Col>
            <FormGroup>
                <Label>Email address</Label>
                <Input
                    type="text"
                    name="email"
                    onChange={props.emailChange}
                    placeholder="email@example.com"
                    required
                />
            </FormGroup>
        </Col>
    )
}

function Password(props) {
    return (
        <Col>
            <FormGroup>
                <Label>Password</Label>
                <Input
                    type="password"
                    name='password'
                    onChange={props.passwordChange}
                    placeholder="Str0ngPa55%"
                    required
                />
            </FormGroup>
        </Col>
    )
}

function Login(props) {
    return (
        <Row>
            <Col md={6} className="m-auto">
                {/* <InfoToast isShow={this.state.isShow} message={this.state.message} onClick={this.handleToast} /> */}
                <form >
                    <Email />
                    <Password />
                    <Col>
                        <Button type="submit" color="primary">Sign in</Button>
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

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isShow: false,
//             email: '',
//             password: ''
//         };

//         // this.loggedIn = sessionStorage.getItem('isLogged') === 'true';
//         // Без этого работает, но в документации сказано, что не будет
//         // this.handleSubmit = this.handleSubmit.bind(this);
//         // this.handleChange = this.handleChange.bind(this);
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//         const { email, password } = this.state;

//         if (email === '' || password === '') {
//             this.setState({
//                 isShow: true,
//                 message: "Wow",
//                 icon: "danger"
//             });
//             return
//         }

//         let data = {
//             email: email,
//             password: password
//         }

//     }

//     handleChange = (name, value) => {
//         this.setState({ [name]: value });
//     }

//     handleToast = () => this.setState({
//         isShow: false
//     });

//     render() {
//         return (
//             <div className='row col-md-6 m-auto'>
//                 <InfoToast isShow={this.state.isShow} message={this.state.message} onClick={this.handleToast} />
//                 <form onSubmit={this.handleSubmit}>
//                     <Email onChange={this.handleChange} />
//                     <Password onChange={this.handleChange} />
//                     <SignInBtn />
//                 </form>
//                 <SignUpBtn />
//             </div>
//         )

//     }
// }

export default Login;
