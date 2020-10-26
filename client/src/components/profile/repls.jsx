import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Input, Button } from 'reactstrap';

const mapStateToProps = (state) => {
    return {
        login: state.login,
        profile: state.profile
    }
}

const EditProfile = (props) => {
    console.log("edit", props);

    const test = (e) => {
        // if (e.target.value === 'like' || e.target.value === 'ignore' || e.target.value === 'unlike') {
        //     props.fetchUpdateStatus(props.me, props.you, props.status, e.target.value);
        // }
        if (e.target.value) {
            console.log(e.target.value);
            let value = Array.from(e.target.selectedOptions, option => option.value);
            console.log(value);
        }
        else
        {
            console.log('empty');
        }
    }
    return (
        <section className="profile-edit">
            <Container>
                {/* <ModalBody className="text-center"> */}
                <p className="font-profile-head">Username</p>
                <Input type="text" className="form-control" defaultValue={props.login.me.nickname} />

                <p className="font-profile-head">First name</p>
                <Input type="text" className="form-control" defaultValue={props.login.me.firstname} />

                <p className="font-profile-head">Last name</p>
                <Input type="text" className="form-control" defaultValue={props.login.me.lastname} />

                <p className="font-profile-head">Date of Birth</p>
                <Input type="date" className="form-control" defaultValue={props.login.me.datebirth.split("T")[0]} />

                <p className="font-profile-head">Email</p>
                <Input type="email" className="form-control" defaultValue={props.login.me.email} />

                <p className="font-profile-head">Biography</p>
                <Input type="textarea" className="form-control" defaultValue={props.login.me.about} />

                <p className="font-profile-head">Sex</p>
                <select defaultValue={props.login.me.sex} onClick={test}>
                    <option value="famale">Female</option>
                    <option value="male">Male</option>
                    <option value="not">Prefer not to say</option>
                </select>

                <p className="font-profile-head">Sexual preferences</p>
                <select defaultValue={props.login.me.sexpreferences} onClick={test}>
                    <option value="bisexual">bisexual</option>
                    <option value="heterosexual">heterosexual</option>
                    <option value="homosexual">homosexual</option>
                </select>

                <p className="font-profile-head">Tags</p>
                <select multiple defaultValue={props.login.me.tags} onChange={test}>
                    {/* <select multiple onClick={test}> */}
                    <option value="sport">sport</option>
                    <option value="movie">movie</option>
                    <option value="food">food</option>
                    <option value="art">art</option>
                    <option value="travel">travel</option>
                    <option value="dance">dance</option>
                    <option value="animal">animal</option>
                </select>

                <p className="font-profile-head">Current password</p>
                <Input type="password" className="form-control" placeholder="Current password" />

                <p className="font-profile-head">New password</p>
                <Input type="password" className="form-control" placeholder="New password" />

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

export default withRouter(connect(mapStateToProps)(EditProfile));
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
