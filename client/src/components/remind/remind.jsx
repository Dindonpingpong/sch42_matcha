import React from 'react';
import { useState } from 'react';
import { Button, Col, Container, Form, Input, Row } from 'reactstrap';

const Remind = () => {
    const [email, setEmail] = useState('');

    const remind = () => {
        console.log(email);
    }

    return (
        <section className="page-state">
            <Container>
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