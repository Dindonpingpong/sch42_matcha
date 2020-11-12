import React from 'react';
import { Container, Row } from 'reactstrap';

const InfoSpan = () => {
    return (
        <section className="page-state">
            <Container>
                <Row>
                    <span className="font-profile-head font-message">Oops! Something went wrong.</span>
                </Row>
            </Container>
        </section>
    )
}

export default InfoSpan;