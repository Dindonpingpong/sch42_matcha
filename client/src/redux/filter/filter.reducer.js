import * as ActionTypes from './ActionTypes';

const initialState = {
    isLoading: true,
    errMsg: null,
    sortType: 'ageAsc',
    filterStatus: null,
    ageFrom: 18,
    ageTo: 120,
    rateFrom: 0,
    rateTo: 1000,
    sex: 'both',
    tags: [],
    location: [],
<<<<<<< HEAD
<<<<<<< HEAD
    sortType: 'ageAsc',
=======
    allUsersCount: null,
    allPagesCount: null,
>>>>>>> master
=======
    allUsersCount: null,
    allPagesCount: null,
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
    info: {}
}

export const FilterReducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.FILTER_CLEAR:
            return { ...initialState };

        case ActionTypes.FILTER_LOADING:
            return { ...state, isLoading: true, errMsg: null };

        case ActionTypes.FILTER_FAILED:
            return { ...state, isLoading: false, errMsg: action.payload };

        case ActionTypes.FILTER_ADD:
            return { ...state, isLoading: false, errMsg: null, isLogged: true, filterStatus: action.status };

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

        case ActionTypes.SORT_TYPE_ADD:
            return { ...state, isLoading: false, errMsg: null, sortType: action.sortType };

<<<<<<< HEAD
<<<<<<< HEAD
=======
        case ActionTypes.COUNT_CARD_ADD:
            return { ...state, isLoading: false, errMsg: null, allUsersCount: action.payload };

>>>>>>> master
=======
        case ActionTypes.COUNT_CARD_ADD:
            return { ...state, isLoading: false, errMsg: null, allUsersCount: action.payload };

>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
        default:
            return state;
    }
}