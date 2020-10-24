import React from 'react';
import { Container, Alert, Input } from 'reactstrap';
import { useState } from 'react';
import { Col, FormGroup, Label, FormFeedback } from 'reactstrap';
import { isValidInput, isValidPassword } from '../util/check';
// const concat = require('concat-stream');

function InputForm(props) {
    const [isValid, toggleValid] = useState('');

    const nameChange = (e) => {
        const { name, value } = e.target;

        if (isValidInput(name, value))
            toggleValid('is-valid');
        else
            toggleValid('is-invalid');

        // props.set(name, value);
    };

    return (
        <Col sm={6}>
            <FormGroup>
                <Label>{props.labelName}</Label>
                <Input
                    type={props.type}
                    name={props.name}
                    onChange={nameChange}
                    placeholder={props.placeholder}
                    required
                    className={isValid}
                />
                <FormFeedback>{props.feedback}</FormFeedback>
            </FormGroup>
        </Col>
    )
}

const NotFound = () => {
    return (
        <section className="page-state">
            <Container>
                <Alert color='info'>
                    Oooopsy!
                    Page not found
                    </Alert>
                {/* <form action='/api/user/image/rkina/2' method='post' encType='multipart/form-data'> */}
                <label htmlFor='1'>Here</label>
                <InputForm 
                // onBlur={checkBtn} 
                labelName='Last name' name='lastName' placeholder='Ng' type='text' feedback='Only symbols are required' />
            </Container>
        </section>
    )
}

export default NotFound;