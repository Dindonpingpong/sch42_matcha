import React from 'react';
import { Container, Alert, Input } from 'reactstrap';
import { request } from './../util/http';

// const concat = require('concat-stream');

function putPhoto(e) {

    let formData = new FormData();
    // const file = document.getElementById('1').files[0];
    formData.append('photo', e.target.files[0])
    // fetch('/api/user/image/rkina/2', {
    //     method: 'POST',
    //     body: formData
    //   });
    request('/api/user/image/rkina/2', formData, 'POST');
}


const NotFound = () => {

    return (
        <section className="page-state">
            <Container>
                <Alert color='info'>
                    Oooopsy!
                    Page not found
                    </Alert>
                {/* <form action='/api/user/image/rkina/2' method='post' encType='multipart/form-data'> */}
                <label htmlFor='1'>Here</label>
                <Input id='1' type='file' onChange={putPhoto} hidden />
                {/* <button onClick={putPhoto} /> */}
                {/* <Input type='submit' value='Add'></Input> */}
                {/* </form> */}
                <img src='/api/user/image/rkina/1/11d4127a548f827002746046d5ec6c00' />
            </Container>
        </section>
    )

}

export default NotFound;