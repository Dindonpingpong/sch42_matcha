import React from 'react';
import {
    Container, Row, Col, Nav, NavItem, Card, CardImg, CardText, CardBody,
    CardTitle,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './profile.css';

function TagsList(props) {
    const listItems = props.tags.map((tag) =>
        <NavItem className="tags">
            <Link to="#">#{tag}</Link>
        </NavItem>
    );
    return (
        <Nav>{listItems}</Nav>
    );
}

function PhotoList(props) {
    const listItems = props.photos.map((photo, item) =>
        <div className="col-md-4">
            <Card className="mb-4 shadow-sm">
                <CardImg src={photo} alt={"Photo profile"} />
                <CardBody>
                    <div class="d-flex justify-content-between align-items-center">
                        {/* <button type="button" className="btn btn-sm btn-success">Add</button>
                        <button type="button" className="btn btn-sm btn-danger">Delete</button> */}

                        {/* <input className="profile-input" type="file" id={`customFile${item}`} /> */}
                        <input className="profile-input" type="file" id={"customFile" + item} />
                        <label className="btn btn-sm btn-success" for={`customFile${item}`}>Add</label>
                        <button type="button" className="btn btn-sm btn-danger">Delete</button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
    return (
        <Row>{listItems}</Row>
    );
}

const Profile = (props) => {
    const tags = ["test1", "test2", "test3"];
    const photos = ["../img/avatar.svg", "../img/photo.svg", "../img/photo.svg", "../img/photo.svg", "../img/photo.svg"];
    // 2020-10-15 22:48:26.218516

    return (
        <section className="profile text-break">
            <Container>
                <Row>
                    <Col className="col-lg-3">
                        <img src="../img/1.jpg" alt="avatar" className="mx-auto d-block img-thumbnails rounded-circle" />
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
                        <ul className="nav">
                            <li className="nav-item tags">
                                <Link to="#">#test</Link>
                            </li>
                            <li className="nav-item tags">
                                <Link to="#">#tet</Link>
                            </li>
                            <li className="nav-item tags">
                                <Link to="#">#test</Link>
                            </li>
                        </ul>

                        <TagsList tags={tags} />
                    </Col>
                </Row>

                <p className="font-profile-head">Photo</p>
                <PhotoList photos={photos} />

            </Container>
        </section>
    );
}

export default Profile;
