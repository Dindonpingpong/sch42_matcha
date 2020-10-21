import React, { Component } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

class InfoToast extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    toggle = () => this.props.onClick();

    render() {
        return (
            <div className="p-3 my-2 rounded">
                <Toast isOpen={this.props.isShow} >
                    <ToastHeader toggle={this.toggle} icon={this.props.icon}>
                        Message
                        </ToastHeader>
                    <ToastBody>
                        {this.props.message}
                    </ToastBody>
                </Toast>
            </div>
        )
    }
}

export default InfoToast;