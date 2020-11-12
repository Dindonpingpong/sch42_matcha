import React, { useState } from "react";
import { Alert } from "reactstrap";

const Info = (props) => {
    const [isVisible, setClose] = useState(true);
    const color = props.isSuccess ? 'success' : 'danger';

    return (
        <div>
            <Alert isOpen={isVisible} color={color} onClick={() => setClose(false)}>{props.message}</Alert>
        </div>
    )
}

export default Info;