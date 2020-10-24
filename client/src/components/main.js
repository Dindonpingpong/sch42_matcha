import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './login/Login';
import Sign from './sign/Sign';
import NotFound from './notFound';
import Header from './header';
import Users from './users/users';
import Profile from './profile/Profile';
import EditProfile from './profile/EditProfile';
import Footer from './Footer';
import Remind from './remind/remind';

export function Main() {

    return (
        <div>
            <Router>
            <Header />
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Sign} />
                    <Route exact={true} path='/users/page/:page' component={Users} />
                    <Route path='/users/:nickname' component={Profile} />
                    <Route path='/edit' component={EditProfile} />
                    <Route path='/remind' component={Remind} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
            <Footer />
        </div>
    )
}
