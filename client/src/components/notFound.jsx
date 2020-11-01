import React, { useEffect } from 'react';
import { Container, Alert, Input } from 'reactstrap';
import { useState } from 'react';
import { Col, FormGroup, Label, FormFeedback } from 'reactstrap';
import { isValidInput, isValidPassword } from '../util/check';
import Button from 'reactstrap/lib/Button';
import { request } from '../util/http';
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';


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
    const [disabled, setBtn] = useState(false);

    const geo = () => {
        if (navigator.geolocation) {
            setBtn(true);
            navigator.geolocation.getCurrentPosition(updatePosition);
        } else {
            console.log('NO');
        }

        function updatePosition(position) {
            console.log(position.coords.latitude, 'fdsa,', position.coords.longitude);
            request(`https://geocode-maps.yandex.ru/1.x/?apikey=74b2ed32-1340-405d-be18-ab91a877defe&format=json&geocode=${position.coords.longitude},${position.coords.latitude}`)
                .then(res => res.json())
                .then(result => {
                    console.log(result.response);
                })
        }
    }

    const [coords, changeCoords] = useState([55.751574, 37.573856]);

    return (
        <section className="page-state">
            <Container>
                {/* <Alert color='info'>
                    Oooopsy!
                    Page not found
                    </Alert> */}
                {/* <form action='/api/user/image/rkina/2' method='post' encType='multipart/form-data'> */}
                <div>You position</div>
                <YMaps >
                    <div>
                        <Map width={500} height={300} defaultState={{ center: [55.75, 37.57], zoom: 9, controls: [] }} onClick={(e) => {
                            console.log(e.get('coords'));
                            changeCoords(e.get('coords'));
                        }}>
                            <ZoomControl options={{ float: 'right' }} />
                            <Placemark defaultGeometry={[55.751574, 37.573856]} 
                            geometry={coords}/>
                        </Map>
                    </div>
                </YMaps>
                {/* <InputForm 
                // onBlur={checkBtn} 
                labelName='Last name' name='lastName' placeholder='Ng' type='text' feedback='Only symbols are required' /> */}
                <Button onClick={geo} labelName='Geo' disabled={disabled}>Geo</Button>
            </Container>
        </section>
    )
}

export default NotFound;