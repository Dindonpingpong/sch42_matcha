import React, { Component } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Main } from './components/main';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configStore';

const store = ConfigureStore();

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        )
    }
}

export default App;