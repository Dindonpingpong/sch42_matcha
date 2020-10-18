import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './login/Login';
import Sign from './sign/Sign';
import NotFound from './notFound';
import Header from './header';
import Users from './users';
import Profile from './profile/Profile';
import Footer from './Footer';

export function Main() {

    return (
        <div>
            <Header />
            <Router>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Sign} />
                    <Route exact={true} path='/users' component={Users} />
                    <Route path='/users/:nickname' component={Profile} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
            <Footer />
        </div>
    )
}
