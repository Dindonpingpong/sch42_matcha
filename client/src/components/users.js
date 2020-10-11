import React, { Component } from 'react';
import {
    Container, Row, Col, ListGroup, ListGroupItem, Nav, Button, Collapse, Card, CardBody, CardImg, CardTitle,
    CardSubtitle, Badge, InputGroup, InputGroupAddon,
    FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            collapse: false
        }
    }

    toggleModal = () => this.setState({ modal: !this.state.modal });
    toggleCollapse = () => this.setState({ collapse: !this.state.collapse });

    render() {

        return (
            <Nav expand="lg" color="light">
                <Container>
                    <Row>
                        <Col xs={6}>
                            <FormGroup>
                                <Input type="select" className="form-control">
                                    <option>Age ^</option>
                                    <option>Age</option>
                                    <option>Rate ^</option>
                                    <option>Rate</option>
                                    <option>Location A-Z</option>
                                    <option>Location Z-A</option>
                                    <option>Tags A-Z</option>
                                    <option>Tags Z-A</option>
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col xs={4}>
                            <Button
                                type="button"
                                color="primary"
                                onClick={this.toggleModal}
                            >
                                Filters
                            </Button>
                        </Col>

                        <Modal isOpen={this.state.modal}>
                            <ModalHeader>
                                <Row>
                                    <Col xs={10}>
                                        <p>Additional filters</p>
                                    </Col>
                                    <Col xs={2}>
                                        <Button onClick={this.toggleModal} close />
                                    </Col>
                                </Row>
                            </ModalHeader>
                            <ModalBody className="text-center">
                                <Row>
                                    <Col xs={12}>
                                        <p className="font-profile-head">Age</p>
                                    </Col>
                                    <Col xs={6}>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="18"
                                        >
                                        </Input>
                                    </Col>
                                    <Col xs={6}>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="80"
                                        >
                                        </Input>
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col xs={12}>
                                        <p className="font-profile-head">Rate</p>
                                    </Col>

                                    <Col xs={6}>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="0"
                                        >
                                        </Input>
                                    </Col>

                                    <Col xs={6}>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="1000"
                                        >
                                        </Input>
                                    </Col>

                                </Row>

                                <Row className="mt-2">
                                    <Col xs={12}>
                                        <p className="font-profile-head">Age</p>
                                    </Col>
                                    <Col xs={6}>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="18"
                                        >
                                        </Input>
                                    </Col>
                                    <Col xs={6}>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            placeholder="80"
                                        >
                                        </Input>
                                    </Col>
                                </Row>

                                <Row className="mt-2 ">
                                    <Col xs={12}>
                                        <p className="font-profile-head">Sex</p>
                                    </Col>
                                    <Col xs={12}>
                                        <ListGroup horizontal>
                                            <ListGroupItem tag="button" action >Male</ListGroupItem>
                                            <ListGroupItem tag="button" action active>Female</ListGroupItem>
                                            <ListGroupItem tag="button" action >Both</ListGroupItem>
                                        </ListGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col xs={12}>
                                        <Button color="primary" onClick={this.toggleCollapse}>Locations</Button>
                                        <Collapse isOpen={this.state.collapse}>
                                            <Card>
                                                <CardBody>
                                                    Moscow Berlin New-York
                                            </CardBody>
                                            </Card>
                                        </Collapse>
                                    </Col>
                                    <Col xs={12} className="mt-2">
                                        <InputGroup className="mb-3">
                                            <Input
                                                placeholder="Moscow"
                                                type="text"
                                            >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button outline color="secondary">Добавить</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </Row>

                                <Row className="mt-2">
                                    <Col xs={12} className="mb-1">
                                        <Button color="primary" onClick={this.toggleCollapse}>Tags</Button>
                                        <Collapse isOpen={this.state.collapse}>
                                            <Card>
                                                <CardBody>
                                                    sport movie food travel
                                            </CardBody>
                                            </Card>
                                        </Collapse>
                                    </Col>
                                    <Col xs={12} className="mt-2">
                                        <InputGroup className="mb-3">
                                            <Input
                                                placeholder="Sport"
                                                type="text"
                                            >
                                            </Input>
                                            <InputGroupAddon addonType="append">
                                                <Button outline color="secondary">Добавить</Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </Row>

                                <ModalFooter>
                                    <Button color="secondary" onClick={this.toggleModal}>
                                        Cancel
                                </Button>
                                    <Button color="success">
                                        Save
                                </Button>
                                </ModalFooter>
                            </ModalBody>
                        </Modal>
                    </Row>
                </Container>
            </Nav>
        )
    }
}

class UserCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "Annie",
            age: 14,
            location: "Moscow",
            sex: "Female",
            preference: "Heteresexual",
            tags: ['food', 'movies']
        }
    }

    render() {
        return (
            <Col md={4}>
                <Card className="mb-4">
                    <CardImg width="100%" top src="https://i.pinimg.com/originals/08/5e/9f/085e9fa1ee1b67a3d338313c0b024061.png" />
                    <CardBody>
                        <CardTitle>{this.state.name}
                            <Badge color="primary" pill>{this.state.age}</Badge>
                        </CardTitle>
                        <CardSubtitle className="mb-2 text-muted">{this.state.location}</CardSubtitle>
                        <ListGroup flush>
                            <ListGroupItem>{this.state.sex}</ListGroupItem>
                            <ListGroupItem>{this.state.preference}</ListGroupItem>
                            <ListGroupItem>{this.state.tags}</ListGroupItem>
                        </ListGroup>
                        <Button color="primary" >Go to profile</Button>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

class Users extends Component {
    render() {
        // if (sessionStorage.getItem('isLogged') === 'true')
        //     history.push('/login')

        return (
            <div>
                <Filter></Filter>
                <Container>
                    <Row>
                        <UserCard />
                        <UserCard />
                        <UserCard />
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Users;