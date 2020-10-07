import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './components/login';
import Sign from './components/sign';
import NotFound from './components/notFound';
import history from './history';

sessionStorage.setItem('isLogged', false);

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    
                </div>
                <div className='container'>
                    <Switch>
                        <Route exact={true} path='/' component={Login} />
                        <Route path='/register' component={Sign} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router >
        )
    }
}

export default App;
