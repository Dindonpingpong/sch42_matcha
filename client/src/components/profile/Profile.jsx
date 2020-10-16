import React, { useState } from 'react';
import {
    Container, Row, Col, Nav, NavItem, NavLink, Card, CardImg, CardBody, TabContent, TabPane, Button, Media, Input, Label
} from 'reactstrap';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import './EditProfile';
import './Profile.css';

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
    const listItems = props.photos.map((photo, item) =>
        <Col md="4" key={item}>
            <Card className="mb-4 shadow-sm">
                <CardImg src={photo} alt={"Photo profile"} />
                <CardBody>
                    <div className="d-flex justify-content-between align-items-center">
                        {/* <input className="profile-input" type="file" id={`customFile${item}`} />
                        <label className="btn btn-sm btn-success" htmlFor={`customFile${item}`}>Add</label> */}
                        <Label className="btn btn-sm btn-success">Add
                            <Input className="profile-input" type="file" />
                        </Label>
                        <Button size="sm" color="danger">Delete</Button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
    return (
        <Row>{listItems}</Row>
    );
}

function ViewsList(props) {
    const listItems = props.views.map((view, item) =>
        <div className="col-12 mt-4" key={item}>
            <Media>
                <Media left middle>
                    <Media object src="../img/1.jpg" alt="Profile photo _ name" />
                </Media>
                <Media body className="ml-4">
                    <Media heading>{view.name}</Media>
                    <p>{view.about}</p>
                    <Link to="#" className="btn btn-secondary">Go to profile</Link>
                </Media>
            </Media>
        </div>
    );
    return (
        <Row>{listItems}</Row>
    );
}


const Profile = (props) => {
    const tags = ["test1", "test2", "test3"];
    const photos = ["../img/avatar.svg", "../img/photo.svg", "../img/photo.svg", "../img/photo.svg", "../img/photo.svg"];
    const views = [{ name: "name1", about: "about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 about1 " }, { name: "name2", about: "about2" }, { name: "name3", about: "about3" }];

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <section className="profile text-break">
            <Container>
                <Button color="danger ml-auto d-block">Like</Button>
                <Button className="ml-auto d-block" data-toggle="modal" data-target="#staticBackdrop">Edit profile</Button>

                <Row>
                    <Col className="col-lg-3">
                        <img src="../img/1.jpg" alt="avatar" className="mx-auto d-block profile-avatar rounded-circle" />
                    </Col>
                    <Col className="col-lg-9">
                        <p className="font-profile-head">Nickname</p>
                        <p>Sex, Sexual preferences</p>
                        <p>Age</p>
                        <p>Location</p>
                        <p>About</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <p className="font-profile-head">Biography</p>
                        <p>About</p>
                    </Col>
                </Row>

                <p className="font-profile-head">Tags</p>
                <Row>
                    <Col>
                        <TagsList tags={tags} />
                    </Col>
                </Row>

                <p className="font-profile-head">Photo</p>
                <PhotoList photos={photos} />

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
                                <ViewsList views={views} />
                            </TabPane>
                            <TabPane tabId="2">
                                <ViewsList views={views} />
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Profile;
