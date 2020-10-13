import React, { Component } from 'react';
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

        this.state = { data: null, isLoaded: true, error: null };
    }

    componentDidMount() {
        fetch('/api/user/users/test')
            .then(response => {
                console.log(response);
                response.json();
            })
            .then(result => {
                console.log("Res " + result.message);
                // this.setState({ data: result.result, isLoaded: false })
            })
        .catch(e => {
            console.log(e);
            // this.setState({ data: result, isLoaded: false, error: e })
        });
        // request("api/getinfo")
        //     .then(res => { return res.json(); })
        //     .then(
        //         (result) => {
        //             console.log(result.message);
        //             // if (result.error === true) {
        //             // this.toggle(name, 'Invalid');
        //             // this.setState({ feedback: 'Email is already taken' })
        //             // }
        //         },
        //         (error) => {
        //             console.log(error);
        //             // this.setState({
        //             //     isShow: true,
        //             //     message: error,
        //             //     icon: "danger"
        //             // });
        //         }
        //     )
    }

    render() {
        return (
            <div>Hello</div>
            // const { data, isLoaded, error } = this.state;

            // if (isLoaded) return <div>...Loading</div>;

            // if (error) return <div>{`Error: ${e.message}`}</div>;

            // return <h1>{this.state.data.firstname}</h1>;
            // // <section class="profile text-break">
            // <div className="container">
            //     <div className="row">
            //         <div className="col-12">
            //             {/* <h3>{props.prof.firstname}</h3> */}
            //             {/* <h3>{this.prof.firstname}</h3> */}
            //             {/* <h3>{prof.firstname}</h3> */}
            //             <hr />
            //         </div>
            //     </div>
            //     <div className="row">
            //         {/* <RenderProfile prof={props.prof} /> */}
            //         {/* <RenderComments comments={props.comments}
            //                         postComment={props.postComment}
            //                         dishId={props.dish.id} /> */}
            //     </div>
            // </div>
            //     // </section>
        );
    }
}

export default Profile;
