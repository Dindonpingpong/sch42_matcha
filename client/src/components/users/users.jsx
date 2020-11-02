import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Container, Row, Col, ListGroup, ListGroupItem, Nav, Button, Card, CardBody, CardImg, CardTitle, Badge,
    FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, Pagination, PaginationItem, PaginationLink,
    FormFeedback
} from 'reactstrap';
import {
<<<<<<< HEAD
<<<<<<< HEAD
    fetchUsersCard, fetchFilter, initFilter,
=======
    fetchAllUsers, fetchUsersCard, setFilterStatus, initFilter,
>>>>>>> master
=======
    fetchAllUsers, fetchUsersCard, setFilterStatus, initFilter,
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
    setAgeFrom, setAgeTo, setRateFrom, setRateTo, setSex, setTags, setLocation, setSort
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
<<<<<<< HEAD
<<<<<<< HEAD
    fetchUsersCard: (nickname, page, sort) => dispatch(fetchUsersCard(nickname, page, sort)),
    fetchFilter: (data) => dispatch(fetchFilter(data)),
    filterClear: () => dispatch(initFilter()),
=======
    fetchAllUsers: (nickname) => dispatch(fetchAllUsers(nickname)),
    fetchUsersCard: (nickname, page, sort) => dispatch(fetchUsersCard(nickname, page, sort)),
    clearFilter: () => dispatch(initFilter()),
    setFilterStatus: (status) => dispatch(setFilterStatus(status)),
>>>>>>> master
=======
    fetchAllUsers: (nickname) => dispatch(fetchAllUsers(nickname)),
    fetchUsersCard: (nickname, page, sort) => dispatch(fetchUsersCard(nickname, page, sort)),
    clearFilter: () => dispatch(initFilter()),
    setFilterStatus: (status) => dispatch(setFilterStatus(status)),
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
    setAgeFrom: (ageFrom) => dispatch(setAgeFrom(ageFrom)),
    setAgeTo: (ageTo) => dispatch(setAgeTo(ageTo)),
    setRateFrom: (rateFrom) => dispatch(setRateFrom(rateFrom)),
    setRateTo: (rateTo) => dispatch(setRateTo(rateTo)),
    setSex: (sex) => dispatch(setSex(sex)),
    setTags: (tags) => dispatch(setTags(tags)),
    setLocation: (location) => dispatch(setLocation(location)),
    setSort: (sortType) => dispatch(setSort(sortType))
});

<<<<<<< HEAD
<<<<<<< HEAD
=======
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

>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
function Filter(props) {
    const [show, setModal] = useState(false);
    const toggleModal = () => setModal(!show);

    const [isValidInput, setStatusButton] = useState(true);

    const tagsHandle = (e) => {
        let value = [];

        if (e.target.value) {
            value = Array.from(e.target.selectedOptions, option => option.value);
        }

<<<<<<< HEAD
        props.fetchFilter(data);
=======
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

function Filter(props) {
    const [show, setModal] = useState(false);
    const toggleModal = () => setModal(!show);

    const [isValidInput, setStatusButton] = useState(true);

    const tagsHandle = (e) => {
        let value = [];

        if (e.target.value) {
            value = Array.from(e.target.selectedOptions, option => option.value);
        }

        props.filter.setTags(value);
>>>>>>> master
=======
        props.filter.setTags(value);
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
    }

    return (
        <Nav expand="lg" color="light">
            <Row className="users-sort-filter">
                <Col xs={6}>
                    <FormGroup>
                        <Input
                            type="select"
<<<<<<< HEAD
<<<<<<< HEAD
                            onChange={e => { props.setSort(e.target.value) }}
                            defaultValue={props.sortType}
=======
                            onChange={e => { props.filter.setSort(e.target.value) }}
                            defaultValue={props.filter.filter.sortType}
>>>>>>> master
=======
                            onChange={e => { props.filter.setSort(e.target.value) }}
                            defaultValue={props.filter.filter.sortType}
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
                        >
                            <option value="ageAsc">Age ↑</option>
                            <option value="ageDesc">Age ↓</option>
                            <option value="rateAsc">Rate ↑</option>
                            <option value="rateDesc">Rate ↓</option>
                            <option value="tagsAsc">Tags ↑</option>
                            <option value="tagsDesc">Tags ↓</option>
                            <option value="locationAsc">Location A-Z</option>
                            <option value="locationDesc">Location Z-A</option>
                        </Input>
                    </FormGroup>
                </Col>

                <Col xs={4} className="users-filter">
                    <Button
                        type="button"
<<<<<<< HEAD
<<<<<<< HEAD
                        color="primary"
=======
>>>>>>> master
=======
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                            <InputForm name='agefrom' defaultValue={props.filter.filter.ageFrom} set={props.filter.setAgeFrom} setStatusButton={setStatusButton} />
                            <InputForm name='ageto' defaultValue={props.filter.filter.ageTo} set={props.filter.setAgeTo} setStatusButton={setStatusButton} />
>>>>>>> master
=======
                            <InputForm name='agefrom' defaultValue={props.filter.filter.ageFrom} set={props.filter.setAgeFrom} setStatusButton={setStatusButton} />
                            <InputForm name='ageto' defaultValue={props.filter.filter.ageTo} set={props.filter.setAgeTo} setStatusButton={setStatusButton} />
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
                        </Row>

                        <Row className="mt-2">
                            <Col xs={12}>
                                <p className="font-profile-head">Rate</p>
                            </Col>
<<<<<<< HEAD
<<<<<<< HEAD

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

=======
                            <InputForm name='ratefrom' defaultValue={props.filter.filter.rateFrom} set={props.filter.setRateFrom} setStatusButton={setStatusButton} />
                            <InputForm name='rateto' defaultValue={props.filter.filter.rateTo} set={props.filter.setRateTo} setStatusButton={setStatusButton} />
>>>>>>> master
=======
                            <InputForm name='ratefrom' defaultValue={props.filter.filter.rateFrom} set={props.filter.setRateFrom} setStatusButton={setStatusButton} />
                            <InputForm name='rateto' defaultValue={props.filter.filter.rateTo} set={props.filter.setRateTo} setStatusButton={setStatusButton} />
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
                        </Row>

                        <Row className="mt-2 ">
                            <Col xs={12}>
                                <p className="font-profile-head">Sex</p>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                                <Input type='select'>
                                    <option value="famale">Female</option>
=======
                                <Input type='select' defaultValue='both' onChange={e => props.filter.setSex(e.target.value)}>
=======
                                <Input type='select' defaultValue={props.filter.filter.sex} onChange={e => props.filter.setSex(e.target.value)}>
>>>>>>> master
                                    <option value="female">Female</option>
>>>>>>> master
=======
                                <Input type='select' defaultValue='both' onChange={e => props.filter.setSex(e.target.value)}>
                                    <option value="female">Female</option>
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
                                    <option value="male">Male</option>
                                    <option value="both">Both</option>
                                </Input>
                            </Col>
                        </Row>

                        <Row className="mt-2">
<<<<<<< HEAD
<<<<<<< HEAD
=======
                            <Col xs={12} className="mb-1 slidecontainer">
                                <p className="font-profile-head">Location</p>
                                <p className="">Distance km</p>
                                <Input className="mb-1 slider" type='range' min="0" max="1000" step="100" />
                            </Col>
                        </Row>

                        {/* <Row className="mt-2">
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
                            <Col xs={12} className="mb-1">
                                <p className="font-profile-head">Location</p>
                                <Input type='select' multiple>
<<<<<<< HEAD
=======
                            <Col xs={12} className="mb-1 slidecontainer">
                                <p className="font-profile-head">Location</p>
                                <p className="">Distance km</p>
                                <Input className="mb-1 slider" type='range' min="0" max="1000" step="100" />
                            </Col>
                        </Row>

                        {/* <Row className="mt-2">
                            <Col xs={12} className="mb-1">
                                <p className="font-profile-head">Location</p>
                                <Input type='select' multiple>
=======
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
                                    <option value="Moscow">Moscow</option>
                                    <option value="Podolsk">Podolsk</option>
                                </Input>
                            </Col>
                        </Row> */}

                        <Row className="mt-2">
                            <Col xs={12} className="mb-1">
                                <p className="font-profile-head">Tags</p>
                                <Input type='select' multiple defaultValue={props.filter.filter.tags} onChange={e => tagsHandle(e)}>
<<<<<<< HEAD
>>>>>>> master
=======
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
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

<<<<<<< HEAD
<<<<<<< HEAD
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
                            <Button color="success" onClick={handleSubmit}>Save</Button>
=======
                        <ModalFooter className="d-flex justify-content-between align-items-center">
                            <Button color="success" className={isValidInput ? '' : 'disabled-button'} onClick={() => { toggleModal(); props.filter.setFilterStatus('active') }}>Save</Button>
>>>>>>> master
=======
                        <ModalFooter className="d-flex justify-content-between align-items-center">
                            <Button color="success" className={isValidInput ? '' : 'disabled-button'} onClick={() => { toggleModal(); props.filter.setFilterStatus('active') }}>Save</Button>
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    let listItems;
    if (props.cards) {
        listItems = props.cards.map((card, item) =>
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
    }
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
    return (
        <Row>{listItems}</Row>
    );
<<<<<<< HEAD
    // }
=======
    let listItems;
    if (props.cards) {
        listItems = props.cards.map((card, item) =>
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
    }
    return (
        <Row>{listItems}</Row>
    );
>>>>>>> master
=======
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
}

function CardsPagination(props) {
    const countPages = Math.ceil(props.allUsers / 6);

    console.log(props.getPage);
    if (countPages > 1) {
        let count,
            index,
            pages = [];

        if (props.getPage == 1) {
            count = Number(props.getPage) + 2;
            index = props.getPage;
        }
        else {
            count = Number(props.getPage) + 1;
            index = Number(props.getPage) - 1;
        }

        if (props.getPage == countPages) {
            count = props.getPage;
            index = Number(props.getPage) - 2;
        }

        console.log('here', count, index);
        for (index; index <= count; index++) {
            pages.push(index);
        }

        const listItems = pages.map((page, item) =>
            <PaginationItem key={item} className={page == props.getPage ? 'active' : ''}>
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
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
    useEffect(() => {
        // console.log('nick', props.login.me.nickname);
        // console.log('page', props.match.params.page);
        const data = {
            nickname: props.login.me.nickname,
            page: props.match.params.page,
            sort: props.filter.sortType,
            ageFrom: props.filter.ageFrom,
            ageTo: props.filter.ageTo,
            rateFrom: props.filter.rateFrom,
            rateTo: props.filter.rateTo,
            sex: props.filter.sex,
            tags: props.filter.tags,
            location: props.filter.location
        }

        if (data.page > 0) {
            props.fetchAllUsers(data);
            props.fetchUsersCard(data);
        }
    }, [props.match.params.page, props.filter.sortType, props.filter.filterStatus]);
    // props.login.me.nickname
<<<<<<< HEAD
    console.log('info', props.filter);
=======

    useEffect(() => {
        // console.log('nick', props.login.me.nickname);
        // console.log('page', props.match.params.page);
        const data = {
            nickname: props.login.me.nickname,
            page: props.match.params.page,
            sort: props.filter.sortType,
            ageFrom: props.filter.ageFrom,
            ageTo: props.filter.ageTo,
            rateFrom: props.filter.rateFrom,
            rateTo: props.filter.rateTo,
            sex: props.filter.sex,
            tags: props.filter.tags,
            location: props.filter.location
        }

        if (data.page > 0) {
            props.fetchAllUsers(data);
            props.fetchUsersCard(data);
        }
    }, [props.match.params.page, props.filter.sortType, props.filter.filterStatus]);
    // props.login.me.nickname

    // console.log('users', props);
>>>>>>> master
=======

    // console.log('users', props);
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
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
<<<<<<< HEAD
<<<<<<< HEAD
                    <Filter setSort={props.setSort} sortType={props.filter.sortType}/>
=======
                    <Filter filter={props} />
>>>>>>> master
=======
                    <Filter filter={props} />
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
                    <UserCards cards={props.filter.info} />
                    <CardsPagination getPage={props.match.params.page} allUsers={props.filter.allUsersCount} />
                </Container>
            </section>
        );
    }
    else
        return (
            <Container>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
                 <Filter filter={props} />
>>>>>>> master
=======
                 <Filter filter={props} />
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
=======
                <Filter filter={props} />
>>>>>>> master
                <h2>Not</h2>
            </Container>
        );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
