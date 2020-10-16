import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './login';
import Sign from './sign';
import NotFound from './notFound';
import Header from './header';
import Profile from './Profile';
import Users from './users';
import { connect } from 'react-redux';
import { fetchProfile } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        info: state.info,
        test: ""
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProfile: (nickname) => dispatch(fetchProfile(nickname))
});

class Main extends Component {
    // componentDidMount( ) {
    //     this.props.fetchProfile(this.props.test);
    // }

    render() {
        const ProfileInfo = ( {match } ) => {
            this.props.fetchProfile(match.params.nickname);
            // console.log('fds', this.props.info);

            return (
                <Profile info={this.props.info}/>
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