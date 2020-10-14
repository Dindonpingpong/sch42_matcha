import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './login';
import Sign from './sign';
import NotFound from './notFound';
import Header from './header';
import Profile from './profile';
import Users from './users';
import { connect } from 'react-redux';
import { fetchProfile } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        info: state.info,
        test: 'here'
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProfile: (nickname) => dispatch(fetchProfile(nickname))
});

class Main extends Component {
    
    render() {
        const ProfileInfo = ( ) => {
            // this.props.fetchProfile(match.params.nickname);
            // console.log('here' + this.props.info);
        
            return (
                <Profile info={this.props.info} fetchProfile={this.props.fetchProfile}/>
            );
        }

        return (
            <div>
                <Header />
                <div className='container p-5'>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Sign} />
                        <Route exact={true} path='/users' component={Users} />
                        <Route path='/users/:nickname' component={ProfileInfo} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));