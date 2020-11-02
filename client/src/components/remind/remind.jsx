import React from 'react';
import { useState } from 'react';
import { Button, Col, Container, Form, Input, Row } from 'reactstrap';
import Alert from 'reactstrap/lib/Alert';
import { request } from '../../util/http';

const Remind = () => {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState(null);

    const remind = () => {
        const data = {
            email: email
        }

        request('/api/user/remind', data, 'POST')
            .then(res => res.json())
            .then(res => {
                setMsg('wow');
                console.log(res.message);
            })
    }

    return (
        <section className="page-state">
            <Container>
                {
                    msg &&
                <Alert color='success'>{msg} Check your email</Alert>
                }
                <Row>
                    <Col>
                        <Input onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className='mt-6' onClick={remind} color='primary'>Recovery</Button>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Remind;