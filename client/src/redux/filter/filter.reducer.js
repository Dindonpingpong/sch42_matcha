import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: true,
    errMsg: null,
    filterStatus: null,
    ageFrom: 18,
    ageTo: 120,
    rateFrom: 0,
    rateTo: 1000,
    sex: 'both',
    tags: [],
    location: [],
    info: {}
}

export const FilterReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.FILTER_ADD:
            return { ...state, isLoading: false, errMsg: null, isLogged: true, filterStatus: action.payload };

        case ActionTypes.FILTER_CLEAR:
            return { ...initialState };

        case ActionTypes.FILTER_LOADING:
            return { ...state, isLoading: true, errMsg: null, filterStatus: null };

        case ActionTypes.FILTER_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload, filterStatus: null };

        case ActionTypes.FILTER_AGE_FROM_ADD:
            return { ...state, isLoading: false, errMsg: null, ageFrom: action.ageFrom };

        case ActionTypes.FILTER_AGE_TO_ADD:
            return { ...state, isLoading: false, errMsg: null, ageTo: action.ageTo };

        case ActionTypes.FILTER_RATE_FROM_ADD:
            return { ...state, isLoading: false, errMsg: null, rateFrom: action.rateFrom };

        case ActionTypes.FILTER_RATE_TO_ADD:
            return { ...state, isLoading: false, errMsg: null, rateTo: action.rateTo };

        case ActionTypes.FILTER_SEX_ADD:
            return { ...state, isLoading: false, errMsg: null, sex: action.sex };

        case ActionTypes.FILTER_TAGS_ADD:
            return { ...state, isLoading: false, errMsg: null, tags: action.tags };

        case ActionTypes.FILTER_LOCATION_ADD:
            return { ...state, isLoading: false, errMsg: null, location: action.location };

        case ActionTypes.USERS_CARD_ADD:
            return { ...state, isLoading: false, errMsg: null, info: action.payload };

        default:
            return state;
    }
}