import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Input, Button, FormFeedback, Alert } from 'reactstrap';
import { isValidInput } from '../../util/check';
import { request } from '../../util/http';
import { Loading } from '../Loading';
import moment from 'moment';
import { YMaps, Map, Placemark, ZoomControl, GeolocationControl } from 'react-yandex-maps';
import { initFormEdit, fetchEditProfile, setLogin, setFirstName, setLastName, setDate, setEmail, setAbout, setSex, setSexPref, setTags, setNewPassword, setCoords } from '../../redux/editProfile/ActionCreators';

const mapStateToProps = (state) => {
    return {
        login: state.login,
        profile: state.profile,
        edit: state.edit
    }
}

const mapDispatchToProps = (dispatch) => ({
    clearForm: () => dispatch(initFormEdit()),
    fetchEditProfile: (data, login) => dispatch(fetchEditProfile(data, login)),
    setLogin: (login) => dispatch(setLogin(login)),
    setFirstName: (firstName) => dispatch(setFirstName(firstName)),
    setLastName: (lastName) => dispatch(setLastName(lastName)),
    setDate: (date) => dispatch(setDate(date)),
    setEmail: (email) => dispatch(setEmail(email)),
    setAbout: (about) => dispatch(setAbout(about)),
    setSex: (sex) => dispatch(setSex(sex)),
    setSexPref: (sexPref) => dispatch(setSexPref(sexPref)),
    setTags: (tags) => dispatch(setTags(tags)),
    setGeo: (coords) => dispatch(setCoords(coords)),
    setNewPassword: (newPass) => dispatch(setNewPassword(newPass))
});

function InputForm(props) {
    const [isValid, toggleValid] = useState('');
    const [feedback, setFeedback] = useState(props.feedback);

    const inputChange = (e) => {
        const { name, value } = e.target;

        if (isValidInput(name, value)) {
            toggleValid('is-valid');

            if (name === 'email' || name === 'login') {
                request(`/api/register/check/${name}/${value}`)
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

                request('/api/register/check/pass', data, 'POST')
                    .then(res => res.json())
                    .then(result => {
                        console.log('h2', result);
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

function Geo(props) {
    const newPos = (e) => {
        const newCoords = e.get("coords");

        props.set({ x: newCoords[0], y: newCoords[1] });
        props.checkBtn();
    }

    const myPos = () => {
        const updatePosition = (position) => {
            props.set({ x: position.coords.latitude, y: position.coords.longitude });
            props.checkBtn();
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(updatePosition);
        }
    }

    return (
        <div>
            <p className="font-profile-head">Location</p>
            <YMaps

                enterprise
                query={{
                    apikey: '74b2ed32-1340-405d-be18-ab91a877defe',
                    lang: "en_US",
                }}
            >
                <div>
                    <Map
                        className="profile-edit-map"
                        defaultState={{
                            center: [props.position.x, props.position.y],
                            zoom: 9,
                            controls: []
                        }}
                        onClick={newPos}
                    >
                        <GeolocationControl options={{ float: 'left' }} onClick={myPos} />
                        <ZoomControl options={{ float: 'right' }} />
                        {
                            props.editPos &&
                            <Placemark geometry={[props.editPos.x, props.editPos.y]} />
                        }
                        {
                            !props.editPos &&
                            <Placemark defaultGeometry={[props.position.x, props.position.y]} />
                        }
                    </Map>
                </div>
            </YMaps>
        </div>
    )
}

const EditProfile = (props) => {
    const history = useHistory();

    const { clearForm } = props;
    const { editProfileStatus } = props.edit;
    const { nickname } = props.login.me;
    const { params } = props.match;

    useEffect(() => {
        if (editProfileStatus !== null) {
            clearForm();
            history.push(`/users/${nickname}`);
        }
    }, [params, editProfileStatus, history, nickname, clearForm]);

    const [isActiveBtn, toggleBtn] = useState(true);

    const handleSubmit = () => {
        const data = {
            nickname: props.edit.nickname,
            firstname: props.edit.firstname,
            lastname: props.edit.lastname,
            datebirth: props.edit.datebirth,
            email: props.edit.email,
            about: props.edit.about,
            sex: props.edit.sex,
            sexpreferences: props.edit.sexpreferences,
            newtags: props.edit.tags,
            oldtags: props.login.me.tags,
            coords: props.edit.coords,
            newpass: props.edit.newpass
        }

        // if (data) {
        props.fetchEditProfile(data, props.login.me.nickname);
        // }
        props.clearForm();
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

    // if (props.edit.editProfileStatus !== null) {
    //     history.push(`/users/${props.login.me.nickname}`);
    // }

    if (props.login.isLoading) {
        return (
            <Loading />
        );
    }
    else if (props.login.errMsg) {
        return (
            <Container>
                <Row>
                    {/* <h4>{props.profile.errProfile}</h4> */}
                    <h4>Error</h4>
                </Row>
            </Container>
        );
    }
    else if (props.login.me != null) {
        return (
            <section className="profile-edit">
                {
                    props.edit.errMsg &&
                    <Alert color='danger' >{props.edit.errMsg}</Alert>
                }

                <Container>
                    {/* <ModalBody className="text-center"> */}
                    <InputForm name='Login' me={props.login.me.nickname} label='Username' feedback='Invalid login' set={props.setLogin} checkBtn={checkBtn} />
                    <InputForm name='firstName' me={props.login.me.firstname} label='First name' feedback='Only symbols are required' set={props.setFirstName} checkBtn={checkBtn} />
                    <InputForm name='lastName' me={props.login.me.lastname} label='Last name' feedback='Only symbols are required' set={props.setLastName} checkBtn={checkBtn} />
                    <InputForm name='Email' me={props.login.me.email} label='Email' set={props.setEmail} feedback='Invalid email' checkBtn={checkBtn} />
                    <InputForm name='bio' me={props.login.me.about} label='Biography' set={props.setAbout} checkBtn={checkBtn} />
                    <InputForm name='birthDate' me={moment(props.login.me.datebirth).format('YYYY-MM-DD')} type='date' label='Date Birth' feedback='Too young' set={props.setDate} checkBtn={checkBtn} />

                    <p className="font-profile-head">Sex</p>
                    <Input type='select' defaultValue={props.login.me.sex} onChange={e => {
                        props.setSex(e.target.value);
                        checkBtn();
                    }}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </Input>

                    <p className="font-profile-head">Sexual preferences</p>
                    <Input type='select' defaultValue={props.login.me.sexpreferences} onChange={e => {
                        props.setSexPref(e.target.value);
                        checkBtn();
                    }}>
                        <option value="bisexual">Bisexual</option>
                        <option value="heterosexual">Heterosexual</option>
                        <option value="homosexual">Homosexual</option>
                    </Input>

                    <p className="font-profile-head">Tags</p>
                    <Input type='select' multiple defaultValue={props.login.me.tags} onChange={e => {
                        tagsHandle(e);
                        checkBtn();
                    }} >
                        <option value="sport">Sport</option>
                        <option value="movie">Movie</option>
                        <option value="food">Food</option>
                        <option value="art">Art</option>
                        <option value="travel">Travel</option>
                        <option value="dance">Dance</option>
                        <option value="animal">Animal</option>
                    </Input>

                    <Geo position={props.login.me.position} set={props.setGeo} editPos={props.edit.coords} checkBtn={checkBtn} />

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
    else
        return (
            <Container>
                <h2>Not</h2>
            </Container>
        );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
