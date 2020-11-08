import React from 'react';
import { useState } from 'react';
import { setLogin, setFirstName, setLastName, setEmail, setPassword, setRepassword, setDate, fetchRegister, setSex } from '../../redux/sign/ActionCreators';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavLink, Card, CardBody, Row, Col, FormGroup, Label, Input, FormFeedback, Button, Container, Alert } from 'reactstrap';
import { isValidInput, isValidPassword } from '../../util/check';
import { request } from '../../util/http';
import { useHistory } from "react-router-dom";
import { Loading } from '../Loading';
import '../login/Login.css';

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
    setSex: (sex) => dispatch(setSex(sex)),
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
                <Label className="font-profile-head">
                    {props.labelName}
                    <Input
                        type={props.type}
                        name={props.name}
                        onChange={nameChange}
                        onBlur={props.onBlur}
                        placeholder={props.placeholder}
                        required
                        className={isValid}
                    />
                    <FormFeedback>{props.feedback}</FormFeedback>
                </Label>
            </FormGroup>
        </Col>
    )
}

function InputFormWithFetch(props) {
    const [isValid, toggleValid] = useState('');
    const [feedback, setFeedback] = useState('Oopsy');

    const checkExist = (name, value) => {
        request(`/api/register/check/${name}/${value}`)
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
        <Col>
            <FormGroup>
                <Label className="font-profile-head">
                    {props.labelName}
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
                </Label>
            </FormGroup>
        </Col>
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
            <Col>
                <FormGroup>
                    <Label className="font-profile-head">
                        Password
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
                    </Label>
                </FormGroup>
            </Col>
            <Col>
                <FormGroup>
                    <Label className="font-profile-head">
                        Re-Password
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
                    </Label>
                </FormGroup>
            </Col>
        </Row>
    )
}

const Sign = (props) => {
    const history = useHistory();
    const [isActiveBtn, toggleBtn] = useState(false);

    const handleSubmit = () => {
        const { nickName, lastName, firstName, email, password, dateBirth, sex } = props.sign;

        let data = {
            nickName: nickName,
            lastName: lastName,
            firstName: firstName,
            email: email,
            password: password,
            date: dateBirth,
            sex: sex
        }

        props.fetchRegister(data)
            .then(() => {
                history.push('/login');
            })
    }

    const checkBtn = () => {
        const countValidInputs = document.querySelectorAll(".is-valid").length;
        const countInvalidInputs = document.querySelectorAll(".is-invalid").length;

        if (countValidInputs === 7 && countInvalidInputs === 0)
            toggleBtn(false);
        else
            toggleBtn(true);
    }

    if (props.sign.isLoading) {
        return (
            <Loading />
        )
    }
    else if (props.errMsg) {
        return (
            <Alert color='info'>{props.errMsg}</Alert>
        )
    }
    else
        return (
            <section className="login">
                <Container>
                    <Row>
                        <Col md={10} className="m-auto">
                            <Card className="mb-4 shadow-sm">
                                <CardBody>
                                    <Row>
                                        <InputForm
                                            set={props.setLastName} onBlur={checkBtn} labelName='Last name'
                                            name='lastName' placeholder='Ng' type='text' feedback='Only symbols are required'
                                        />

                                        <InputForm
                                            set={props.setFirstName} onBlur={checkBtn} labelName='First name'
                                            name='firstName' placeholder='Duong' type='text' feedback='Only symbols are required'
                                        />
                                    </Row>
                                    <Row>
                                        <InputFormWithFetch set={props.setLogin} onBlur={checkBtn} labelName='Login' placeholder='rkina7' />
                                        <InputFormWithFetch set={props.setEmail} onBlur={checkBtn} labelName='Email' placeholder='rkina@mail.ru' />
                                    </Row>
                                    <Row>
                                        <InputForm
                                            set={props.setDate} onBlur={checkBtn} labelName='Date birth'
                                            name='birthDate' type='date' feedback='You too young for this'
                                        />
                                        <Col>
                                            <p className="font-profile-head">Sex</p>
                                            <Input type='select'
                                                defaultValue={props.sign.sex}
                                                onChange={e => {
                                                    props.setSex(e.target.value);
                                                    checkBtn();
                                                }}>
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                            </Input>
                                        </Col>
                                    </Row>
                                    <Password setPass={props.setPassword} onBlur={checkBtn} />
                                    <Button color="secondary" type="submit" disabled={isActiveBtn} onClick={handleSubmit} onBlur={checkBtn} block>Sign Up</Button>
                                    <Col>
                                        <div className="dropdown-divider"></div>
                                        <NavLink href='/login' >Back</NavLink>
                                    </Col>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sign));
