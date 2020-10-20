import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Input, Button, Label } from 'reactstrap';

const mapStateToProps = (state) => {
    return {
        login: state.login,
        profile: state.profile
    }
}

const EditProfile = (props) => {
    console.log("edit", props);
    return (
        <section className="profile-edit">
            <Container>
                {/* <ModalBody className="text-center"> */}
                <p className="font-profile-head">Username</p>
                <Input type="text" className="form-control" value={props.login.me.nickname} />

                <p className="font-profile-head">First name</p>
                <Input type="text" className="form-control" value={props.login.me.firstname} />

                <p className="font-profile-head">Last name</p>
                <Input type="text" className="form-control" value={props.login.me.lastname} />

                <p className="font-profile-head">Date of Birth</p>
                <Input type="date" className="form-control" value={props.login.me.datebirth.split("T")[0]} />

                <p className="font-profile-head">Biography</p>
                <Input type="textarea" className="form-control" value={props.login.me.about} />

                <p className="font-profile-head">Sex</p>
                <div className="form-check-inline">
                    <Label className="profile-edit-label">
                        <Input type="radio" name="OptionsSex" value="sexMale" />
                        male
                    </Label>
                    <Label className="profile-edit-label">
                        <Input type="radio" name="OptionsSex" value="sexFamale" />
                        female
                    </Label>
                    <Label className="profile-edit-label">
                        <Input type="radio" name="OptionsSex" value="sexNot" />
                        prefer not to say
                    </Label>
                </div>

                <p className="font-profile-head">Sexual preferences</p>
                <div className="form-check-inline">
                    <Label className="profile-edit-label">
                        <Input type="radio" name="OptionsSexPreferences" value="sexPreferencesBi" />
                        bi
                    </Label>
                    <Label className="profile-edit-label">
                        <Input type="radio" name="OptionsSexPreferences" value="sexPreferencesHetero" />
                        hetero
                    </Label>
                    <Label className="profile-edit-label">
                        <Input type="radio" name="OptionsSexPreferences" value="sexPreferencesHomo" />
                        homo
                    </Label>
                </div>

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
