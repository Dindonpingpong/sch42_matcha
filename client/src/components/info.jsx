import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";

const Info = (props) => {
    const [isVisible, setClose] = useState(true);
    const color = props.isError ? 'danger' : 'success';

    // useEffect(() => {
    //     window.setTimeout(() => {
    //         setClose(!isVisible);
    //     }, 5000);
    // }, []);

    return (
        <div>
            <Alert isOpen={isVisible} color={color}>{props.message}</Alert>
        </div>
    )
}

export default Info;