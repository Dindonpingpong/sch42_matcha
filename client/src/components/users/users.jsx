import React, { useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Container, Row, Col, ListGroup, ListGroupItem, Nav, Button, Card, CardBody, CardImg, CardTitle, Badge,
    FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink,
    FormFeedback
} from 'reactstrap';
import {
    fetchAllUsers, fetchUsersCard, setFilterStatus, initFilter,
    setAgeFrom, setAgeTo, setRateFrom, setRateTo, setSex, setTags, setDistance, setSort
} from '../../redux/filter/ActionCreators';
import { Loading } from '../Loading';
import './Users.css'
import { useState } from 'react';

const mapStateToProps = (state) => {
    return {
        login: state.login,
        profile: state.profile,
        filter: state.filter
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchAllUsers: (nickname) => dispatch(fetchAllUsers(nickname)),
    fetchUsersCard: (nickname, page, sort) => dispatch(fetchUsersCard(nickname, page, sort)),
    clearFilter: () => dispatch(initFilter()),
    setFilterStatus: (status) => dispatch(setFilterStatus(status)),
    setAgeFrom: (ageFrom) => dispatch(setAgeFrom(ageFrom)),
    setAgeTo: (ageTo) => dispatch(setAgeTo(ageTo)),
    setRateFrom: (rateFrom) => dispatch(setRateFrom(rateFrom)),
    setRateTo: (rateTo) => dispatch(setRateTo(rateTo)),
    setSex: (sex) => dispatch(setSex(sex)),
    setTags: (tags) => dispatch(setTags(tags)),
    setDistance: (location) => dispatch(setDistance(location)),
    setSort: (sortType) => dispatch(setSort(sortType))
});

function InputForm(props) {
    const [isValid, toggleValid] = useState('is-valid');
    const [feedback, setFeedback] = useState(props.feedback);

    const inputChange = (e) => {
        const { name, value } = e.target;
        // добавить проверку на A > B?

        let isAge = (value.match(/^\d{2,3}$/)) ? true : false;
        let isRate = (value.match(/^\d{1,4}$/)) ? true : false;

        // console.log('ic', props);

        if (isAge) {
            if (name === 'agefrom') {
                return (value < 18 || value > 120)
                    ? (toggleValid('is-invalid'), setFeedback("Age range 18 - 130 only 1"))
                    : (toggleValid('is-valid'), props.set(value));
            }
            if (name === 'ageto') {
                return (value < 18 || value > 120)
                    ? (toggleValid('is-invalid'), setFeedback("Age range 18 - 130 only 2"))
                    : (toggleValid('is-valid'), props.set(value));
            }
        }
        else
            toggleValid('is-invalid');

        if (isRate) {
            if (name === 'ratefrom') {
                return (value < 0 || value > 1000)
                    ? (toggleValid('is-invalid'), setFeedback("Rate range 0 - 1000 only 1"))
                    : (toggleValid('is-valid'), props.set(value));
            }
            if (name === 'rateto') {
                return (value < 0 || value > 1000)
                    ? (toggleValid('is-invalid'), setFeedback("Rate range 0 - 1000 only 2"))
                    : (toggleValid('is-valid'), props.set(value));
            }
        }
        else
            toggleValid('is-invalid');
    };

    const checkInput = () => {
        props.setStatusButton((document.querySelectorAll(".is-invalid").length > 0) ? false : true);
    }

    return (
        <Col xs={6}>
            <Input
                type="number"
                name={props.name}
                defaultValue={props.defaultValue}
                onChange={inputChange}
                className={isValid}
                onBlur={checkInput}
            />
            <FormFeedback>{feedback}</FormFeedback>
        </Col>
    )
}

function DistanceFrom(props) {
    const [distance, setDistance] = useState(props.defaultValue);

    return (
        <Row className="mt-2">
            <Col xs={12} className="mb-1 slidecontainer">
                <p className="font-profile-head">Location</p>
                <p className="">Distance {distance} km</p>
                <Input
                    className="mb-1 slider" defaultValue={props.defaultValue}
                    type='range' min="50"
                    max="1000" step="50" onChange={(e) => {
                        props.set(e.target.value);
                        setDistance(e.target.value);
                    }} />
            </Col>
        </Row>
    )
}

function Filter(props) {
    const history = useHistory();

    const [show, setModal] = useState(false);
    const toggleModal = () => setModal(!show);
    
    const [isValidInput, setStatusButton] = useState(true);

    const tagsHandle = (e) => {
        let value = [];

        if (e.target.value) {
            value = Array.from(e.target.selectedOptions, option => option.value);
        }

        props.filter.setTags(value);
    }

    return (
        <Nav expand="lg" color="light">
            <Row className="users-sort-filter">
                <Col xs={6}>
                    <FormGroup>
                        <Input
                            type="select"
                            onChange={e => { props.filter.setSort(e.target.value) }}
                            defaultValue={props.filter.filter.sortType}
                        >
                            <option value="ageAsc">Age ↑</option>
                            <option value="ageDesc">Age ↓</option>
                            <option value="rateAsc">Rate ↑</option>
                            <option value="rateDesc">Rate ↓</option>
                            <option value="tagsAsc">Tags ↑</option>
                            <option value="tagsDesc">Tags ↓</option>
                            <option value="locationAsc">Distance ↑</option>
                            <option value="locationDesc">Distance ↓</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Col xs={4} className="users-filter">
                    <Button
                        type="button"
                        onClick={toggleModal}
                        color="secondary"
                    >
                        Filters
                    </Button>
                </Col>

                <Modal isOpen={show}>
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
                            <InputForm name='agefrom' defaultValue={props.filter.filter.ageFrom} set={props.filter.setAgeFrom} setStatusButton={setStatusButton} />
                            <InputForm name='ageto' defaultValue={props.filter.filter.ageTo} set={props.filter.setAgeTo} setStatusButton={setStatusButton} />
                        </Row>

                        <Row className="mt-2">
                            <Col xs={12}>
                                <p className="font-profile-head">Rate</p>
                            </Col>
                            <InputForm name='ratefrom' defaultValue={props.filter.filter.rateFrom} set={props.filter.setRateFrom} setStatusButton={setStatusButton} />
                            <InputForm name='rateto' defaultValue={props.filter.filter.rateTo} set={props.filter.setRateTo} setStatusButton={setStatusButton} />
                        </Row>

                        <Row className="mt-2 ">
                            <Col xs={12}>
                                <p className="font-profile-head">Sex</p>
                                <Input type='select' defaultValue={props.filter.filter.sex} onChange={e => props.filter.setSex(e.target.value)}>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="both">Both</option>
                                </Input>
                            </Col>
                        </Row>

                        <DistanceFrom set={props.filter.setDistance} defaultValue={props.filter.filter.distance} />

                        <Row className="mt-2">
                            <Col xs={12} className="mb-1">
                                <p className="font-profile-head">Tags</p>
                                <Input type='select' multiple defaultValue={props.filter.filter.tags} onChange={e => tagsHandle(e)}>
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

                        <ModalFooter className="justify-content-between">
                        <Button
                                color="success"
                                className={isValidInput ? '' : 'disabled-button'}
                                onClick={() => { toggleModal(); props.filter.setFilterStatus('active'); history.push('/users/page/1') }}>
                                Save
                            </Button>
                            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>
            </Row>
        </Nav>
    );
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
    let listItems;
    if (props.cards.length > 0) {
        listItems = props.cards.map((card, item) =>
            <Col md={4} key={item}>
                <Card className="mb-4">
                    <CardImg width="100%" top src={`/api/image/${card.nickname}/1/${card.photos}`} alt={`Profile photo ${card.nickname}`} />
                    <CardBody>
                        <CardTitle>
                            {card.nickname} <Badge color="danger" pill> {card.rate} </Badge>
                        </CardTitle>
                        <ListGroup flush>
                            <ListGroupItem>{card.firstname} {card.lastname}, {card.age}</ListGroupItem>
                            <ListGroupItem>{card.city} ({Math.floor(Number(card.distance))} km)</ListGroupItem>
                            <ListGroupItem>{card.sex}</ListGroupItem>
                            <ListGroupItem>{card.sexpreferences}</ListGroupItem>
                            <TagsList tags={card.tags} />
                        </ListGroup>
                        <Link to={`/users/${card.nickname}`} className="card-btn btn btn-secondary">Go to profile</Link>
                    </CardBody>
                </Card>
            </Col>
        );
    }
    return (
        <Row>{listItems}</Row>
    );
}

function CardsPagination(props) {
    const countPages = Math.ceil(props.allUsers / 6);

    if (countPages > 1) {
        let count,
            index,
            pages = [],
            currentPage = Number(props.getPage);

        if (currentPage === 1 && countPages !== 2) {
            count = currentPage + 2;
            index = currentPage;
        }
        else if (currentPage === 1 && countPages === 2) {
            count = currentPage + 1;
            index = currentPage;
        }
        else if (currentPage === 2 && countPages === 2) {
            count = currentPage;
            index = currentPage - 1;
        }
        else {
            count = currentPage + 1;
            index = currentPage - 1;
        }
        if (currentPage === countPages && countPages !== 2) {
            count = currentPage;
            index = currentPage - 2;
        }

        for (index; index <= count; index++) {
            pages.push(index);
        }

        const listItems = pages.map((page, item) =>
            <PaginationItem key={item} className={page === currentPage ? 'active-link' : ''}>
                <PaginationLink href={`/users/page/${page}`}>
                    {page}
                </PaginationLink>
            </PaginationItem>
        );

        return (
            <Pagination className="users-pagination">
                {
                    countPages > 3 &&
                    <PaginationItem>
                        <PaginationLink first href="/users/page/1" />
                    </PaginationItem>
                }

                {listItems}

                {
                    countPages > 3 &&
                    <PaginationItem>
                        <PaginationLink last href={`/users/page/${countPages}`} />
                    </PaginationItem>
                }
            </Pagination>
        );
    }
    else
        return (<div></div>);
}

const Users = (props) => {

    useEffect(() => {
        // console.log('nick', props.login.me.nickname);
        // console.log('page', props.match.params.page);
        const data = {
            nickname: props.login.me.nickname,
            mySex: props.login.me.sex,
            mySexpref: props.login.me.sexpreferences,
            page: props.match.params.page,
            sort: props.filter.sortType,
            ageFrom: props.filter.ageFrom,
            ageTo: props.filter.ageTo,
            rateFrom: props.filter.rateFrom,
            rateTo: props.filter.rateTo,
            sex: props.filter.sex,
            tags: props.filter.tags,
            distance: props.filter.distance
        }

        if (data.page > 0) {
            props.fetchAllUsers(data);
            props.fetchUsersCard(data);
        }
    }, [props.match.params.page, props.filter.sortType, props.filter.filterStatus]);
    // props.login.me.nickname

    // console.log('users', props);
    // console.log(props.match.params.page);

    if (props.filter.isLoading || props.filter.info === null) {
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
                    <Filter filter={props} />
                    <UserCards cards={props.filter.info} />
                    <CardsPagination getPage={props.match.params.page} allUsers={props.filter.allUsersCount} />
                </Container>
            </section>
        );
    }
    else
        return (
            <Container>
                <Filter filter={props} />
                <h2>Not</h2>
            </Container>
        );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
