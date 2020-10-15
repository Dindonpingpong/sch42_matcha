import React, { Component } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configStore';

const store = ConfigureStore();

=======
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
>>>>>>> 97d9adfd0635bd7e03d2d29748f5b54379717ff1

class App extends Component {
    
    render() {
        console.log('here',store);
        return (
<<<<<<< HEAD
            <Provider store={store}>
                <Router >
                    <Main />
                </Router >
            </Provider>
=======
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
>>>>>>> 97d9adfd0635bd7e03d2d29748f5b54379717ff1
        )
    }
}

export default App;
