import { createStore, combineReducers, applyMiddleware } from 'redux';
import { ProfileReducer } from './profile/profile.reducer';
import { EditProfileReducer } from './editProfile/editProfile.reducer';
import { LoginReducer } from './login/login.reducer';
import { SignReducer } from './sign/sign.reducer';
import { FilterReducer } from './filter/filter.reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {}

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            profile: ProfileReducer,
            login: LoginReducer,
            sign: SignReducer,
            edit: EditProfileReducer,
            filter: FilterReducer
        }),
        persistedState,
        applyMiddleware(thunk, logger)
    );

    return store;
}