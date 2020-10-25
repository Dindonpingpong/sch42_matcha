import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Input, Button, FormFeedback } from 'reactstrap';
import { isValidInput, isValidPassword } from '../../util/check';
import { useState } from 'react';
import { request } from '../../util/http';
import { setLogin, setFirstName, setLastName, setDate, setEmail, setAbout, setSex, setSexPref, setTags, setNewPassword } from '../../redux/editProfile/ActionCreators';

const mapStateToProps = (state) => {
    return {
        login: state.login,
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => ({
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
            if (name === 'email') {
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
            else if (name === 'currentPass') {
                const data = [props.me, value];
                request('/api/user/check/pass', data, 'POST')
                    .then(res => res.json())
                    .then(result => {
                        if (result.success === true) {
                            toggleValid('is-invalid');
                            setFeedback(`Wrong password`)
                        }
                    })
                    .catch(error => (error.message));
            }
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
                className={isValid}
            />
            <FormFeedback>{feedback}</FormFeedback>
        </div>
    )
}

function Tags(props) {
    return (
        <div>
            <p className="font-profile-head">Tags</p>
            <select id='51' multiple
                // defaultValue={props.login.me.tags}
                onClick={e => {
                    props.setTags(e.target.value);
                    console.log(document.getElementById('51'));
                    // console.log(Array.from(e.target.querySelectorAll('option[selected]')).map(el => el.value));
                }}>
                {/* <select multiple onClick={test}> */}
                <option value="sport">sport</option>
                <option value="movie">movie</option>
                <option value="food">food</option>
                <option value="art">art</option>
                <option value="travel">travel</option>
                <option value="dance">dance</option>
                <option value="animal">animal</option>
            </select>
        </div>
    )
}

const EditProfile = (props) => {
    // console.log("edit", props);

    const test = (e) => {
        // if (e.target.value === 'like' || e.target.value === 'ignore' || e.target.value === 'unlike') {
        //     props.fetchUpdateStatus(props.me, props.you, props.status, e.target.value);
        // }
        if (e.target.value)
            console.log(e.target.value);
    }
    return (
        <section className="profile-edit">
            <Container>
                {/* <ModalBody className="text-center"> */}
                <InputForm name='login' me={props.login.me.nickname} label='Username' feedback='Invalid login' set={props.setLogin} />
                <InputForm name='firstName' me={props.login.me.firstname} label='First name' feedback='Only symbols are required' set={props.setFirstName} />
                <InputForm name='lastName' me={props.login.me.lastname} label='Last name' feedback='Only symbols are required' set={props.setLastName} />
                <InputForm name='email' me={props.login.me.email} label='Email' set={props.setEmail} />
                <InputForm name='bio' me={props.login.me.about} label='Biography' set={props.setAbout} />


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
                <select id='51' multiple
                    // defaultValue={props.login.me.tags}
                    onClick={e => {
                        props.setTags(e.target.value);
                        console.log(document.getElementById('51'));
                        // console.log(Array.from(e.target.querySelectorAll('option[selected]')).map(el => el.value));
                    }}>
                    {/* <select multiple onClick={test}> */}
                    <option value="sport">sport</option>
                    <option value="movie">movie</option>
                    <option value="food">food</option>
                    <option value="art">art</option>
                    <option value="travel">travel</option>
                    <option value="dance">dance</option>
                    <option value="animal">animal</option>
                </select>

                <InputForm name='currentPass' type='password' label='Current password' me={props.login.me.nickname} placeholder="Current password" feedback='Too weak password. 8 symbols is required' />
                <InputForm name='newPass' type='password' label='New password' placeholder="New password" feedback='Too weak password. 8 symbols is required' set={props.setNewPassword} />

                <div className="d-flex justify-content-between align-items-center">
                    {/* <Button href="#" as="input" type="button" value="Save" className="btn-success">Save</Button> */}
                    <Button href="#" className="btn-success" value="Save" >Save</Button>
                    {/* ml-auto d-block */}
                    <Link to={`/users/${props.login.me.nickname}`} className="btn btn-secondary">Close</Link>
                </div>
            </Container>
        </section >
    );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
