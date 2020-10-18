import React, { Component } from 'react';
import { Container, Alert } from 'reactstrap';

class NotFound extends Component {
    render() {
        return (
            <section className="page-state">
                <Container>
                    <Alert color='info'>
                        Oooopsy!
                        Page not found
                    </Alert>
                </Container>
            </section>
        )
    }
}

export default NotFound;