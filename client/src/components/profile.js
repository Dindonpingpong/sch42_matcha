import React, { Component } from 'react';
import { request } from '../util/http'

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        request('api/user/check/' + this.props.match.params.id)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    render() {
        return(
            <div>
                {this.props.match.params.id}
                Hello
            </div>
        )
    }
}

export default Profile;