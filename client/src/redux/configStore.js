import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ProfileReducer, ViewReducer, LikeReducer }from './profile/profile.reducer';
import { LoginReducer } from './login/login.reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            profile: ProfileReducer,
            login: LoginReducer
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}