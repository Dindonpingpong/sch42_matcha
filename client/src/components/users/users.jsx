import React, { useEffect, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Container, Row, Col, ListGroup, ListGroupItem, Nav, Button, Card, CardBody, CardImg, CardTitle, Badge,
    FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import { fetchUsersCard, fetchFilter, initFilter, setAgeFrom, setAgeTo, setRateFrom, setRateTo, setSex, setTags, setLocation } from '../../redux/filter/ActionCreators';
import { Loading } from '../Loading';
import './Users.css'

const mapStateToProps = (state) => {
    return {
        login: state.login,
        profile: state.profile,
        filter: state.filter
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchUsersCard: (nickname, page) => dispatch(fetchUsersCard(nickname, page)),
    fetchFilter: (data) => dispatch(fetchFilter(data)),
    filterClear: () => dispatch(initFilter()),
    setAgeFrom: (ageFrom) => dispatch(setAgeFrom(ageFrom)),
    setAgeTo: (ageTo) => dispatch(setAgeTo(ageTo)),
    setRateFrom: (rateFrom) => dispatch(setRateFrom(rateFrom)),
    setRateTo: (rateTo) => dispatch(setRateTo(rateTo)),
    setSex: (sex) => dispatch(setSex(sex)),
    setTags: (tags) => dispatch(setTags(tags)),
    setLocation: (location) => dispatch(setLocation(location)),
});

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

function TagsList(props) {
    let listItems;
    if (props.tags) {
        listItems = props.tags.map((tag, item) =>
            // <NavItem className="tags" key={item}>
            //     <Link to="#">#{tag}</Link>
            // </NavItem>
            <span className="tags" key={item}>#{tag}</span>
        );
    }
    return (
        <ListGroupItem>{listItems}</ListGroupItem>
    );
}

function UserCards(props) {
    // if (props.cards.length > 0) {
        const listCards = props.cards.map((card, item) =>
            <Col md={4} key={item}>
                <Card className="mb-4">
                    <CardImg width="100%" top src={`/api/user/image/${card.nickname}/1/${card.photos}`} alt={`Profile photo ${card.nickname}`} />
                    <CardBody>
                        <CardTitle>
                            {card.nickname} <Badge color="danger" pill> {card.rate} </Badge>
                        </CardTitle>
                        <ListGroup flush>
                            <ListGroupItem>{card.firstname} {card.lastname}, {card.age}</ListGroupItem>
                            <ListGroupItem>{card.city}</ListGroupItem>
                            <ListGroupItem>{card.sex}</ListGroupItem>
                            <ListGroupItem>{card.sexpreferences}</ListGroupItem>
                            <TagsList tags={card.tags} />
                        </ListGroup>
                        <Link to={`/users/${card.nickname}`} className="card-btn btn btn-secondary">Go to profile</Link>
                    </CardBody>
                </Card>
            </Col>
        );
        return (
            <Row>{listCards}</Row>
        );
    // }
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
    useEffect(() => {
        console.log('nick', props.login.me.nickname);
        console.log('page', props.match.params.page);
        props.fetchUsersCard(props.login.me.nickname, props.match.params.page);
    }, [props.login.me.nickname, props.match.params.page]);

    // console.log('info', props.filter);

    // const handleSubmit = () => {
    //     const data = {
    //         ageFrom: props.edit.ageFrom,
    //         ageTo: props.edit.ageTo,
    //         rateFrom: props.edit.rateFrom,
    //         rateTo: props.edit.rateTo,
    //         sex: props.edit.sex,
    //         tags: props.edit.tags,
    //         location: props.edit.location
    //     }

    //     props.fetchFilter(data);
    // }

    // console.log(props.match.params.page);

    if (props.filter.isLoading) {
        return (
            <Loading />
        );
    }
    else if (props.filter.errMsg) {
        return (
            <Container>
                <Row>
                    {/* <h4>{props.profile.errProfile}</h4> */}
                    <h4>Error</h4>
                </Row>
            </Container>
        );
    }
    else if (props.filter.info != null) {
        return (
            <section className="users">
                <Container>
                    <Filter></Filter>
                    <UserCards cards={props.filter.info} />
                    <CardsPagination />
                </Container>
            </section>
        );
    }
    else
        return (
            <div>Not</div>
        );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
