import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";

const Info = (props) => {
    const [isVisible, setClose] = useState(true);
    const color = props.isSuccess ? 'success' : 'danger';

    useEffect(() => {
        let interval = null;

        if (isVisible) {
            interval = window.setTimeout(() => {
                setClose(!isVisible);
            }, 5000);
        }
    }, [isVisible]);

    return (
        <div>
            <Alert isOpen={isVisible} color={color}>{props.message}</Alert>
        </div>
    )
}

export default Info;