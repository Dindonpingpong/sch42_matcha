import React from 'react';
import { Container, Spinner } from 'reactstrap';

export const Loading = () => {
    return (
        <section className="page-state">
            <Container>
                {/* <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner> */}
                <Spinner animation="border" />
            </Container>
        </section>
    );
};