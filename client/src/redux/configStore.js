import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Profile }from './profile';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            info: Profile
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}