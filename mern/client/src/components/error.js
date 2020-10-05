import React, { Component } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

class ErrorToast extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => this.props.onClick();

    render() {
        return (
            <div className="p-3 my-2 rounded">
                <Toast isOpen={this.props.isError}>
                    <ToastHeader toggle={this.toggle}>
                        Reactstrap
                        </ToastHeader>
                    <ToastBody>
                        {this.props.errMessage}
                    </ToastBody>
                </Toast>
            </div>
        )
    }
}

export default ErrorToast;