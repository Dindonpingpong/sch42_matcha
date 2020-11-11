import React from 'react';
import { Container } from 'reactstrap';
import Info from './info';

const NotFound = () => {

    return (
        <section className="page-state">
            <Container>
                <Info isSuccess={true} message="404 page not found"/>
            </Container>
        </section>
    )
}

export default NotFound;