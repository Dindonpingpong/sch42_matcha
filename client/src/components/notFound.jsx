import React from 'react';
import { Container } from 'reactstrap';
import Info from './info';

const NotFound = () => {

    return (
        <section className="page-state">
            <Container>
                <Info message='gasd' isError={true} />
            </Container>
        </section>
    )
}

export default NotFound;