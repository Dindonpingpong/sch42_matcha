import React from 'react';
import { useState } from 'react';
import { setLogin, setFirstName, setLastName, setEmail, setPassword, setRepassword, setDate, fetchRegister } from '../../redux/sign/ActionCreators';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, Label, Input, FormFeedback, Button, Container } from 'reactstrap';
import { isValidInput, isValidPassword } from '../../util/check';
import { request } from '../../util/http';
import { useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        sign: state.sign
    }
}

const mapDispatchToProps = (dispatch) => ({
    setLogin: (login) => dispatch(setLogin(login)),
    setFirstName: (FirstName) => dispatch(setFirstName(FirstName)),
    setLastName: (LastName) => dispatch(setLastName(LastName)),
    setEmail: (Email) => dispatch(setEmail(Email)),
    setPassword: (Password) => dispatch(setPassword(Password)),
    setRepassword: (Repassword) => dispatch(setRepassword(Repassword)),
    setDate: (date) => dispatch(setDate(date)),
    fetchRegister: (data) => dispatch(fetchRegister(data))
});

function InputForm(props) {
    const [isValid, toggleValid] = useState('');

    const nameChange = (e) => {
        const { name, value } = e.target;

        if (isValidInput(name, value)) {
            toggleValid('is-valid');
            props.set(value);
        }
        else
            toggleValid('is-invalid');

    };

    return (
        <Col>
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

function InputFormWithFetch(props) {
    const [isValid, toggleValid] = useState('');
    const [feedback, setFeedback] = useState('Oopsy');

    const checkExist = (name, value) => {
        request(`/api/user/register/check/${name}/${value}`)
            .then(res => res.json())
            .then(
                result => {
                    if (result.success === true) {
                        toggleValid('is-invalid');
                        setFeedback(`${name} is taken`)
                    }
                }
            )
    }

    const inputChange = (e) => {
        const { name, value } = e.target;
        if (isValidInput(name, value) === true && value.length > 2) {
            toggleValid('is-valid');
            checkExist(name, value);
            props.set(value);
        }
        else {
            toggleValid('is-invalid');
            setFeedback(`${name} is invalid`)
        }
    };

    return (
        <Row>
            <Col>
                <FormGroup>
                    <Label>{props.labelName}</Label>
                    <Input
                        type="text"
                        name={props.labelName}
                        onChange={inputChange}
                        onBlur={() => props.onBlur()}
                        placeholder={props.placeholder}
                        required
                        feedback={feedback}
                        className={isValid}
                    />
                    <FormFeedback>{feedback}</FormFeedback>
                </FormGroup>
            </Col>
        </Row>
    )
}

function Password(props) {
    const [isValidPass, toggleValidPass] = useState('');
    const [isValidRepass, toggleValidRepass] = useState('');

    const passChange = (e) => {
        const { name, value } = e.target;

        if (name === 'password') {
            if (isValidPassword(value) === true) {
                toggleValidPass('is-valid');
                props.setPass(value);
            }
            else
                toggleValidPass('is-invalid');
        }
        else {
            const password = document.querySelector('input[name="password"]').value;

            if (password === value) {
                toggleValidRepass('is-valid');
            }
            else
                toggleValidRepass('is-invalid');
        }
    };

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
                        className={isValidPass}
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
                        className={isValidRepass}
                    />
                    <FormFeedback>Password doesn't match</FormFeedback>
                </FormGroup>
            </Col>
        </Row>
    )
}

function SignUpBtn(props) {
    return (
        <Col>
            <Button className="btn btn" color="primary" type="submit" disabled={props.isActiveBtn} >Sign Up</Button>
        </Col>
    )
}

const Sign = (props) => {
    const history = useHistory();
    const [isActiveBtn, toggleBtn] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const { nickName, lastName, firstName, email, password, repassword, dateBirth } = props.sign;

        let data = {
            nickName: nickName,
            lastName: lastName,
            firstName: firstName,
            email: email,
            password: password,
            date: dateBirth
        }

        request("api/user/register", data, 'POST')
            .then(res => res.json())
            .then(
                (res) => {
                    if (res.success)
                        history.push('/login');
                },
                (error) => {
                    console.log(error.message);
                }
            )
    }

    const checkBtn = () => {
        const countValidInputs = document.querySelectorAll(".is-valid").length;
        const countInvalidInputs = document.querySelectorAll(".is-invalid").length;

        if (countValidInputs === 7 && countInvalidInputs === 0)
            toggleBtn(false);
        else
            toggleBtn(true);
    }

    return (
        <Row>
            <Col md={8} className="m-auto">
                <Container>
                    <form onSubmit={handleSubmit}>
                        <Row xs='1'>
                            <InputForm
                                set={props.setLastName} onBlur={checkBtn} labelName='Last name'
                                name='lastName' placeholder='Ng' type='text' feedback='Only symbols are required'
                            />
                            <InputForm
                                set={props.setFirstName} onBlur={checkBtn} labelName='First name'
                                name='firstName' placeholder='Duong' type='text' feedback='Only symbols are required'
                            />
                        </Row>
                        <Row xs='1'>
                            <InputFormWithFetch set={props.setLogin} onBlur={checkBtn} labelName='login' placeholder='rkina7' />
                            <InputFormWithFetch set={props.setEmail} onBlur={checkBtn} labelName='email' placeholder='rkina@mail.ru' />
                        </Row>
                        <InputForm
                            set={props.setDate} onBlur={checkBtn} labelName='Date birth'
                            name='birthDate' type='date' feedback='You too young for this'
                        />
                        <Password setPass={props.setPassword} onBlur={checkBtn} />
                        <SignUpBtn isActiveBtn={isActiveBtn} onBlur={checkBtn} />
                    </form>
                </Container>
            </Col>
        </Row>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sign));
