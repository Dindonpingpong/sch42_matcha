import React, { Component } from 'react';
<<<<<<< HEAD


const Profile = (props) => {
    // console.log(this.props.match.params.nickname);
    console.log('ghet', props);
    return (
        <div>
            {props.info.info.nickname}
                Hello
        </div>
    )
=======
import { FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from 'reactstrap';
import InfoToast from './info';
import {
    Card, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import { request } from '../util/http';


// const profileInfo = (state = {
//     isLoading: true,
//     errMess: null,
//     prof: []
// }, action) => {
//     switch (action.type) {
//         case 'ADD_DISHES':
//             return { ...state, isLoading: false, errMess: null, prof: action.payload };
//         case "DISHES_LOADING":
//             return { ...state, isLoading: true, errMess: null, prof: [] };
//         case 'DISHES_FAILED':
//             return { ...state, isLoading: false, errMess: action.payload, prof: [] };
//         default:
//             return state;
//     }
// }

// export const profLoading = () => ({
//     type: 'DISHES_LOADING'
// });

// export const profFailed = (errmess) => ({
//     type: 'DISHES_FAILED',
//     payload: errmess
// });

// export const profAdd = (dishes) => ({
//     type: 'ADD_DISHES',
//     payload: prof
// });



class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = { data: {}, isLoaded: true, error: null };
    }

    componentDidMount() {
        fetch('/api/user/' + this.props.match.params.nickname)
            .then(response => response.json())
            .then(result => {
                console.log("Ms: " + result.message);
                this.setState({ data: result.result, isLoaded: false })
            })
            .catch(e => {
                console.log(e);
                this.setState({ isLoaded: false, error: e })
            });
    }

    render() {
        const { data, isLoaded, error } = this.state;
        if (isLoaded) return <div>...Loading</div>;
        if (error) return <div>{`Error: ${error.message}`}</div>;
        else
            return (
                <div className="container">Hello
                
                </div>



               
            );
    }
>>>>>>> 97d9adfd0635bd7e03d2d29748f5b54379717ff1
}

export default Profile;
