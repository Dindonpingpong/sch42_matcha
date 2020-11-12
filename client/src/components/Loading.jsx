import React from 'react';
import { Container, Spinner } from 'reactstrap';

export const Loading = () => {
    return (
        <section className="page-state">
            <Container>
                <Spinner animation="border" />
            </Container>
        </section>
    );
};