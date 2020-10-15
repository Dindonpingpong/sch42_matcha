import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configStore';

const store = ConfigureStore();


class App extends Component {
    
    render() {
        return (
            <Provider store={store}>
                <Router >
                    <Main />
                </Router >
            </Provider>
        )
    }
}

export default App;
