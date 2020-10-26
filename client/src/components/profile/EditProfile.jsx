import React, { useState, useEffect } from 'react';
import { withRouter, useHistory  } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Input, Button, FormFeedback } from 'reactstrap';
import { isValidInput, isValidPassword } from '../../util/check';
import { request } from '../../util/http';
import { initFormEdit, fetchEditProfile, setLogin, setFirstName, setLastName, setDate, setEmail, setAbout, setSex, setSexPref, setTags, setNewPassword } from '../../redux/editProfile/ActionCreators';

const mapStateToProps = (state) => {
    return {
        login: state.login,
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => ({
    clearForm: () => dispatch(initFormEdit()),
    fetchEditProfile: (data) => dispatch(fetchEditProfile(data)),
    setLogin: (login) => dispatch(setLogin(login)),
    setFirstName: (firstName) => dispatch(setFirstName(firstName)),
    setLastName: (lastName) => dispatch(setLastName(lastName)),
    setDate: (date) => dispatch(setDate(date)),
    setEmail: (email) => dispatch(setEmail(email)),
    setAbout: (about) => dispatch(setAbout(about)),
    setSex: (sex) => dispatch(setSex(sex)),
    setSexPref: (sexPref) => dispatch(setSexPref(sexPref)),
    setTags: (tags) => dispatch(setTags(tags)),
    setNewPassword: (newPass) => dispatch(setNewPassword(newPass))
});

function InputForm(props) {
    const [isValid, toggleValid] = useState('');
    const [feedback, setFeedback] = useState(props.feedback);

    const inputChange = (e) => {
        const { name, value } = e.target;

        if (isValidInput(name, value)) {
            toggleValid('is-valid');

            if (name === 'email' || name == 'login') {
                request(`/api/user/register/check/${name}/${value}`)
                    .then(res => res.json())
                    .then(result => {
                        if (result.success === true) {
                            toggleValid('is-invalid');
                            setFeedback(`${name} is taken`)
                        }
                    })
            }
            else if (name === 'currentPass') {
                const data = {
                    login: props.login,
                    password: value
                };

                request('/api/user/register/check/pass', data, 'POST')
                    .then(res => res.json())
                    .then(result => {
                        if (result.success !== true) {
                            toggleValid('is-invalid');
                            setFeedback(`Wrong password`)
                        }
                    })
            }

            if (name !== 'currentPass')
                props.set(value)
        }
        else {
            toggleValid('is-invalid');
        }
    };

    return (
        <div>
            <p className="font-profile-head">{props.label}</p>
            <Input
                type={props.type || 'text'}
                placeholder={props.placeholder || ''}
                className="form-control"
                name={props.name}
                defaultValue={props.me || ''}
                onChange={inputChange}
                onBlur={props.checkBtn}
                className={isValid}
            />
            <FormFeedback>{feedback}</FormFeedback>
        </div>
    )
}

const EditProfile = (props) => {
    const history = useHistory();
    useEffect(() => {
        props.clearForm();
    }, [props.match.params]);
    const [isActiveBtn, toggleBtn] = useState(true);

    const handleSubmit = () => {
        const [nickname, firstname, lastname, email, datebirth,
            about, sex, sexpreferences, tags, newpass] = props.edit;

        const data = {
            nickname: nickname,
            firstname: firstname,
            lastname: lastname,
            datebirth: datebirth,
            email: email,
            about: about,
            sex: sex,
            sexpreferences: sexpreferences,
            tags: tags,
            newpass: newpass
        }

        props.fetchEditProfile(data)
            .then(() => {
                history.pushState('/');
            })
    }

    const tagsHandle = (e) => {
        let value = [];

        if (e.target.value) {
            value = Array.from(e.target.selectedOptions, option => option.value);
        }

        props.setTags(value);
    }

    const checkBtn = () => {
        const countInvalidInputs = document.querySelectorAll(".is-invalid").length;

        if (countInvalidInputs === 0)
            toggleBtn(false);
        else
            toggleBtn(true);
    }

    return (
        <section className="profile-edit">
            <Container>
                {/* <ModalBody className="text-center"> */}
                <InputForm name='login' me={props.login.me.nickname} label='Username' feedback='Invalid login' set={props.setLogin} checkBtn={checkBtn} />
                <InputForm name='firstName' me={props.login.me.firstname} label='First name' feedback='Only symbols are required' set={props.setFirstName} checkBtn={checkBtn} />
                <InputForm name='lastName' me={props.login.me.lastname} label='Last name' feedback='Only symbols are required' set={props.setLastName} checkBtn={checkBtn} />
                <InputForm name='email' me={props.login.me.email} label='Email' set={props.setEmail} checkBtn={checkBtn} />
                <InputForm name='bio' me={props.login.me.about} label='Biography' set={props.setAbout} checkBtn={checkBtn} />
                <InputForm name='birthDate' me={props.login.me.datebirth.split('T')[0]} type='date' label='Date Birth' feedback='Too young' set={props.setDate} checkBtn={checkBtn} />

                <p className="font-profile-head">Sex</p>
                <select defaultValue={props.login.me.sex} onChange={e => props.setSex(e.target.value)}>
                    <option value="famale">Female</option>
                    <option value="male">Male</option>
                    <option value="not">Prefer not to say</option>
                </select>

                <p className="font-profile-head">Sexual preferences</p>
                <select defaultValue={props.login.me.sexpreferences} onChange={e => props.setSexPref(e.target.value)}>
                    <option value="bisexual">bisexual</option>
                    <option value="heterosexual">heterosexual</option>
                    <option value="homosexual">homosexual</option>
                </select>

                <p className="font-profile-head">Tags</p>
                <select multiple defaultValue={props.login.me.tags} onChange={tagsHandle} >
                    <option value="sport">sport</option>
                    <option value="movie">movie</option>
                    <option value="food">food</option>
                    <option value="art">art</option>
                    <option value="travel">travel</option>
                    <option value="dance">dance</option>
                    <option value="animal">animal</option>
                </select>

                <InputForm name='currentPass' login={props.login.me.nickname} type='password' label='Current password' placeholder="Current password" feedback='Too weak password. 8 symbols is required' checkBtn={checkBtn} />
                <InputForm name='newPass' type='password' label='New password' placeholder="New password" feedback='Too weak password. 8 symbols is required' set={props.setNewPassword} checkBtn={checkBtn} />

                <div className="d-flex justify-content-between align-items-center">
                    {/* <Button href="#" as="input" type="button" value="Save" className="btn-success">Save</Button> */}
                    <Button href="#" className="btn-success" disabled={isActiveBtn} value="Save" onClick={handleSubmit} >Save</Button>
                    {/* ml-auto d-block */}
                    <Link to={`/users/${props.login.me.nickname}`} className="btn btn-secondary">Close</Link>
                </div>
            </Container>
        </section >
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
