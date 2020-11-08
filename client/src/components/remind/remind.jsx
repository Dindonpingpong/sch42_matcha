import React from 'react';
import { useState } from 'react';
import { Button, Col, Container, Input, Row, Card, CardBody, Label, NavLink } from 'reactstrap';
import { request } from '../../util/http';
import Info from '../info';
import '../login/Login.css';

const Remind = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState(null);
    const [isSuccess, setSuccess] = useState(null);

    const remind = () => {
        const data = {
            email: email
        }

        request('/api/remind', data, 'POST')
            .then(res => res.json())
            .then(res => {
                setMsg(res.message);
                setSuccess(res.success);
            })
    }

    return (
        <section className="login">
            <Container>
                <Row>
                    <Col md={6} className="m-auto">
                        <Card className="mb-4 shadow-sm">
                            <CardBody>
                                {
                                    msg &&
                                    <Info message={msg} isSuccess={isSuccess} />
                                }
                                <Col>
                                    <Label className="font-profile-head">
                                        Enter your email address to receive a secured link
                                    <Input onChange={(e) => setEmail(e.target.value)} />
                                    </Label>
                                </Col>
                                <Col>
                                    <Button className="login-btn" onClick={remind} color='secondary'>Recovery</Button>
                                </Col>
                                <Col>
                                    <div className="dropdown-divider"></div>
                                    <NavLink href='/login' >Back</NavLink>
                                </Col>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default Remind;