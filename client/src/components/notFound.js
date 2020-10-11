import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class NotFound extends Component {
    render() {
        return (
            <div>
                <Alert color='info'>
                    Oooopsy!
                    Page not found
            </Alert>
            </div>
        )
    }
}

export default NotFound;