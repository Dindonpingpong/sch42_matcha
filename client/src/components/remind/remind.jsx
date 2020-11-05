import React from 'react';
import { useState } from 'react';
import { Button, Col, Container, Input, Row } from 'reactstrap';
import { request } from '../../util/http';
import Info from '../info';

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
        <section className="page-state">
            <Container>
                {
                    msg &&
                    <Info message={msg} isSuccess={isSuccess} />
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