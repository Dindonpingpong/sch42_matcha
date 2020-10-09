import React, { Component } from 'react';
import { Nav, Button, FormGroup, Input, Modal, ModalBody } from 'reactstrap';

class Filter extends Component {
    render() {
        return (
            <Nav expand="lg" color="light">
                <div className="container">
                    <Nav navbar className="mr-auto row">
                        <div className="col-8">
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
                        </div>

                        <div className="col-4">
                            <Button
                                type="button"
                                color="primary"
                                data-toggle="modal"
                                data-target="#staticBackdrop"
                            >
                                Filters
                        </Button>
                        </div>
                    </Nav>
                </div>
            </Nav>
        )
    }
}

class People extends Component {
    render() {
        // if (sessionStorage.getItem('isLogged') === 'true')
        //     history.push('/login')

        return (
            <Filter></Filter>
        )
    }
}

export default People;