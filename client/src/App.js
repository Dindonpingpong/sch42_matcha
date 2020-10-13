import React, { Component } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/login';
import Sign from './components/sign';
import NotFound from './components/notFound';
import Header from './components/header';
import Profile from './components/profile';
import Users from './components/users';
import history from './history';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Header />
                <div className='container p-5'>
                    <Switch>
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Sign} />
                        <Route exact={true} path='/users' component={Users} />
                        <Route path='/users/:nickname' component={Profile} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router >
        )
    }
}

export default App;
