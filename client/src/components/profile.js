import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Label,
    Modal, ModalHeader, ModalBody, Button, Row, Col
} from 'reactstrap';

const Profile = (props) => {

    return (
        <section className="profile text-break">
            <div className="container">
                <Row>
                    <Col className="col-lg-3">
                        <img src="../img/1.jpg" alt="" className="mx-auto d-block img-thumbnail rounded-circle img-fluid" />
                    </Col>
                    <Col className="col-lg-3">
                        <p className="font-profile-head">Nickname</p>
                        <p>Sex, Sexual preferences</p>
                        <p>Age</p>
                        <p>Location</p>
                        <p>
                            About me: Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi sed obcaecati ullam,
                            mollitia delectus voluptatibus earum consequuntur perferendis officiis nostrum velit minima
                            itaque architecto dicta accusantium totam.
                        </p>
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default Profile;
