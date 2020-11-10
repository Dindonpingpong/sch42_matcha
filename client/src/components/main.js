import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './login/Login';
import Sign from './sign/Sign';
import NotFound from './notFound';
import Header from './header/Header';
import Users from './users/Users';
import Profile from './profile/Profile';
import EditProfile from './profile/EditProfile';
import Footer from './Footer';
import Remind from './remind/Remind';
import Restore from './profile/restore/restore';
import Chats from "./chats/Chats";

export function Main() {

    return (
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route exact={true} path='/login' component={Login} />
                    <Route path='/login/:nickname/:hash' component={Login} />
                    <Route path='/register' component={Sign} />
                    <Route exact={true} path='/users/page/:page' component={Users} />
                    <Route path='/users/:nickname' component={Profile} />
                    <Route path='/edit' component={EditProfile} />
                    <Route exact={true} path='/remind' component={Remind} />
                    <Route path='/remind/:email/:hash' component={Restore} />
                    <Route path='/chats' component={Chats} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
            <Footer />
        </div>
    )
}
