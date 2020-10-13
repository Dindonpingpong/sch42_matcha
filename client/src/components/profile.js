import React, { Component } from 'react';
import { request } from '../util/http'

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.match.params.id
        request('api/user/check/' + 'teste')
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