import React, { Component } from 'react';
import {
    Container, Row, Col, ListGroup, ListGroupItem, Nav, Button, Collapse, Card, CardBody, CardImg, CardTitle,
    CardSubtitle, Badge, InputGroup, InputGroupAddon,
    FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import './Users.css'

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
                <Row className="users-sort-filter">
                    <Col xs={6}>
                        <FormGroup>
                            <Input type="select" className="form-control">
                                <option>Age ↑</option>
                                <option>Age ↓</option>
                                <option>Rate ↑</option>
                                <option>Rate ↓</option>
                                <option>Location A-Z</option>
                                <option>Location Z-A</option>
                                <option>Tags A-Z</option>
                                <option>Tags Z-A</option>
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col xs={4} className="users-filter">
                        <Button
                            type="button"
                            color="primary"
                            onClick={this.toggleModal}
                            color="secondary"
                        >
                            Filters
                            </Button>
                    </Col>

                    <Modal isOpen={this.state.modal}>
                        <ModalHeader>
                            <Row>
                                <Col xs={12}>
                                    <p>Filters</p>
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

                            <Row className="mt-2 ">
                                <Col xs={12}>
                                    <p className="font-profile-head">Sex</p>
                                    <Input type='select'>
                                        <option value="famale">Female</option>
                                        <option value="male">Male</option>
                                        <option value="both">Both</option>
                                    </Input>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col xs={12} className="mb-1">
                                    <p className="font-profile-head">Tags</p>
                                    <Input type='select' multiple>
                                        <option value="sport">sport</option>
                                        <option value="movie">movie</option>
                                        <option value="food">food</option>
                                        <option value="art">art</option>
                                        <option value="travel">travel</option>
                                        <option value="dance">dance</option>
                                        <option value="animal">animal</option>
                                    </Input>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col xs={12} className="mb-1">
                                    <p className="font-profile-head">Location</p>
                                    <Input type='select' multiple>
                                        <option value="Moscow">Moscow</option>
                                        <option value="Podolsk">Podolsk</option>
                                    </Input>
                                </Col>
                            </Row>

                            <ModalFooter className="d-flex justify-content-between align-items-center">
                                <Button color="success">Save</Button>
                                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                            </ModalFooter>
                        </ModalBody>
                    </Modal>
                </Row>
            </Nav>
        )
    }
}

function UserCards(props) {
    const listCards = props.cards.map((card, item) =>
        <Col md={4} key={item}>
            <Card className="mb-4">
                <CardImg width="100%" top src={'../' + card.photos} />
                <CardBody>
                    <CardTitle>
                        {card.firstname} <Badge color="danger" pill>{card.age}</Badge>
                    </CardTitle>
                    <ListGroup flush>
                        <ListGroupItem>{card.firstname} {card.firstname}, 20</ListGroupItem>
                        <ListGroupItem>{card.region}, {card.city}</ListGroupItem>
                        <ListGroupItem>{card.sex}</ListGroupItem>
                        <ListGroupItem>{card.sexpreferences}</ListGroupItem>
                        {/* <ListGroupItem>{card.tags}</ListGroupItem> */}
                        <ListGroupItem>#test #test #test</ListGroupItem>
                    </ListGroup>
                    <Button color="secondary card-btn">Go to profile</Button>
                </CardBody>
            </Card>
        </Col>
    );
    return (
        <Row>
            {listCards}
        </Row>
    )
}

function CardsPagination() {
    return (
        <Pagination className="users-pagination">
            <PaginationItem>
                <PaginationLink first href="#" />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                    1
            </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                    2
            </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href="#">
                    3
            </PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink last href="#" />
            </PaginationItem>
        </Pagination>
    );
}

function Users(props) {
    const mock = [
        {
            nickname: 'test12',
            firstname: 'test12',
            age: 45,
            rate: 0,
            sex: 'prefer not to say',
            sexpreferences: 'bisexual',
            region: 'Moscow',
            city: 'Moscow',
            photos: '../img/avatar.svg'
        },
        {
            nickname: 'test13',
            firstname: 'test13',
            age: 55,
            rate: 0,
            sex: 'prefer not to say',
            sexpreferences: 'bisexual',
            region: 'Moscow',
            city: 'Moscow',
            photos: '../img/avatar.svg'
        },
        {
            nickname: 'test12',
            firstname: 'test12',
            age: 45,
            rate: 0,
            sex: 'prefer not to say',
            sexpreferences: 'bisexual',
            region: 'Moscow',
            city: 'Moscow',
            photos: '../img/avatar.svg'
        },
        {
            nickname: 'test12',
            firstname: 'test12',
            age: 45,
            rate: 0,
            sex: 'prefer not to say',
            sexpreferences: 'bisexual',
            region: 'Moscow',
            city: 'Moscow',
            photos: '../img/avatar.svg'
        },
        {
            nickname: 'test13',
            firstname: 'test13',
            age: 55,
            rate: 0,
            sex: 'prefer not to say',
            sexpreferences: 'bisexual',
            region: 'Moscow',
            city: 'Moscow',
            photos: '../img/avatar.svg'
        },
        {
            nickname: 'test12',
            firstname: 'test12',
            age: 45,
            rate: 0,
            sex: 'prefer not to say',
            sexpreferences: 'bisexual',
            region: 'Moscow',
            city: 'Moscow',
            photos: '../img/avatar.svg'
        }
    ]

    return (
        <div>
            <section className="users">
                <Container>
                    <Filter></Filter>
                    <UserCards cards={mock} />
                    <CardsPagination />
                </Container>
            </section>
        </div>
    );
}

export default Users;