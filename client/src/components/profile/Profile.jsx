import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Container, Row, Col, Nav, NavItem, NavLink, Card, CardImg, CardBody, TabContent, TabPane, Button, Media, Input, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { fetchProfile, fetchView, fetchLike } from '../../redux/profile/ActionCreators';
import { Loading } from '../Loading';
import NotFound from '../notFound';
import './Profile.css';

const mapStateToProps = (state) => {
    return {
        login: state.login,
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProfile: (nickname) => dispatch(fetchProfile(nickname)),
    fetchView: (nickname) => dispatch(fetchView(nickname)),
    fetchLike: (nickname) => dispatch(fetchLike(nickname))
});

function TagsList(props) {
    const listItems = props.tags.map((tag, item) =>
        <NavItem className="tags" key={item}>
            <Link to="#">#{tag}</Link>
        </NavItem>
    );
    return (
        <Nav>{listItems}</Nav>
    );
}

function PhotoList(props) {
    let listItems;
    if (props.photos) {
        listItems = props.photos.map((photo, item) => 
            <Col md="4" key={item}>
                <Card className="mb-4 shadow-sm">
                    <CardImg src={photo} alt={"Photo profile"} />
                    <CardBody>
                        <div className="d-flex justify-content-between align-items-center">
                            {/* <input className="profile-input" type="file" id={`customFile${item}`} />
                        <label className="btn btn-sm btn-success" htmlFor={`customFile${item}`}>Add</label> */}
                            <Label className="btn btn-sm btn-success">Add
                            <Input id={item} className="profile-input" type="file" />
                            </Label>
                            <Button size="sm" color="danger">Delete</Button>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        );
    }
    return (
        <Row>{listItems}</Row>
    );
}

function ViewsList(props) {
    if (props.views.length > 0) {
        const listItems = props.views.map((view, item) =>
            <Col xs="12" className="mt-4" key={item}>
                <Media>
                    <Media left middle>
                        <Media object src={view.photos} alt="Profile photo _ name" />
                    </Media>
                    <Media body className="ml-4">
                        <Media heading>{view.nickname}, {view.age}</Media>
                        <p>{view.about}</p>
                        <Link to={`/users/${view.nickname}`} className="btn btn-secondary">Go to profile</Link>
                    </Media>
                </Media>
            </Col>

        );

        return (
            <Row>{listItems}</Row>
        );
    }
    else
        return (
            <div>Not</div>
        );
}

function LikesList(props) {
    if (props.likes.length > 0) {
        const listItems = props.likes.map((like, item) =>
            <Col xs="12" className="mt-4" key={item}>
                <Media>
                    <Media left middle>
                        <Media object src={like.photos} alt="Profile photo _ name" />
                    </Media>
                    <Media body className="ml-4">
                        <Media heading>{like.nickname}, {like.age}</Media>
                        <p>{like.about}</p>
                        <Link to={`/users/${like.nickname}`} className="btn btn-secondary">Go to profile</Link>
                    </Media>
                </Media>
            </Col>
        );
        return (
            <Row>{listItems}</Row>
        );
    }
    else
        return (
            <div>Not</div>
        );
}

function AsideButton(props) {
    if (props.nickname === props.check) {
        return (
            <Link to="/edit" className="btn btn-secondary ml-auto d-block aside-button">
                Edit profile
            </Link>
        );
    }
    return (
        <div>Like</div>
    );
}

const Profile = (props) => {
    useEffect(() => {
        props.fetchProfile(props.match.params.nickname);
        props.fetchView(props.match.params.nickname);
        props.fetchLike(props.match.params.nickname);
    }, [props.match.params.nickname]);

    const tags = ["test1", "test2", "test3"];

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    if (props.profile.isLoading) {
        return (
            <Loading />
        );
    }
    else if (props.profile.errProfile) {
        return (
            <Container>
                <Row>
                    {/* <h4>{props.profile.errProfile}</h4> */}
                    <h4>Error</h4>
                </Row>
            </Container>
        );
    }
    else if (props.profile.info != null)
        return (
            <section className="profile text-break">
                <Container>
                    <AsideButton nickname={props.login.me.nickname} check={props.match.params.nickname} />

                    <Row>
                        <Col className="col-lg-3">
                            <img src="../img/1.jpg" alt="avatar" className="mx-auto d-block profile-avatar rounded-circle" />
                        </Col>
                        <Col ls="9" className="font-profile-head">
                            <h2>{props.profile.info.nickname}</h2>
                            <p>{props.profile.info.firstname} {props.profile.info.lastname}, {props.profile.info.age}</p>
                            <p>{props.profile.info.sex}</p>
                            <p>{props.profile.info.sexpreferences}</p>
                            <p>{props.profile.info.country}, {props.profile.info.city}</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <p className="font-profile-head">Biography</p>
                            <p>{props.profile.info.about}</p>
                        </Col>
                    </Row>

                    <p className="font-profile-head">Tags</p>
                    <Row>
                        <Col>
                            <TagsList tags={tags} />
                        </Col>
                    </Row>

                    <p className="font-profile-head">Photo</p>
                    <PhotoList photos={props.profile.info.photos} />

                    <Row className="profile-tabs">
                        <Col>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                                        Views
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                                        Likes
                                </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <ViewsList views={props.profile.views} />
                                </TabPane>
                                <TabPane tabId="2">
                                    <LikesList likes={props.profile.likes} />
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    else
        return (
            <NotFound />
        );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
