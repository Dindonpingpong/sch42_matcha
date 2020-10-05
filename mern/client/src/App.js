import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/login';
import Sign from './components/sign';

let isLogged = false;

class App extends Component {
    render() {
        return (
            <Router >
                <div className='container'>
                    <Switch>
                        <Route exact={true} path='/' component={Login} />
                        <Route path='/register' component={Sign} />
                    </Switch>
                </div>
            </Router >
        )
    }
}

export default App;
