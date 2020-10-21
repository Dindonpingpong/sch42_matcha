import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ProfileReducer } from './profile/profile.reducer';
import { LoginReducer } from './login/login.reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            profile: ProfileReducer,
            login: LoginReducer
        }),
        persistedState,
        applyMiddleware(thunk, logger)
    );

    return store;
}