import React, { Component } from 'react';


const Profile = (props) => {
    // console.log(this.props.match.params.nickname);
    console.log('ghet', props);
    return (
        <div>
            {props.info.info.nickname}
                Hello
        </div>
    )
}

export default Profile;