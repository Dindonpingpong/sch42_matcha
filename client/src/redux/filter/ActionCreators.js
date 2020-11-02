import * as ActionTypes from './ActionTypes';
import { request } from '../../util/http';

export const filterStatus = (status) => ({
    type: ActionTypes.FILTER_ADD,
    status: status
});

export const filterLoading = () => ({
    type: ActionTypes.FILTER_LOADING
});

export const filterFailed = (msg) => ({
    type: ActionTypes.FILTER_FAILED,
    payload: msg
});

export const filterClear = () => ({
    type: ActionTypes.FILTER_CLEAR
});

export const filterAgeFromAdd = (ageFrom) => ({
    type: ActionTypes.FILTER_AGE_FROM_ADD,
    ageFrom: ageFrom
});

export const filterAgeToAdd = (ageTo) => ({
    type: ActionTypes.FILTER_AGE_TO_ADD,
    ageTo: ageTo
});

export const filterRateFromAdd = (rateFrom) => ({
    type: ActionTypes.FILTER_RATE_FROM_ADD,
    rateFrom: rateFrom
});

export const filterRateToAdd = (rateTo) => ({
    type: ActionTypes.FILTER_RATE_TO_ADD,
    rateTo: rateTo
});

export const filterSexAdd = (sex) => ({
    type: ActionTypes.FILTER_SEX_ADD,
    sex: sex
});

export const filterTagsAdd = (tags) => ({
    type: ActionTypes.FILTER_TAGS_ADD,
    tags: tags
});

export const filterLocationAdd = (location) => ({
    type: ActionTypes.FILTER_LOCATION_ADD,
    location: location
});

export const setFilterStatus = (status) => (dispatch) => {
    dispatch(filterStatus(status));
}

export const setAgeFrom = (ageFrom) => (dispatch) => {
    dispatch(filterAgeFromAdd(ageFrom));
};

export const setAgeTo = (ageTo) => (dispatch) => {
    dispatch(filterAgeToAdd(ageTo));
};

export const setRateFrom = (rateFrom) => (dispatch) => {
    dispatch(filterRateFromAdd(rateFrom));
};

export const setRateTo = (rateTo) => (dispatch) => {
    dispatch(filterRateToAdd(rateTo));
};

export const setSex = (sex) => (dispatch) => {
    dispatch(filterSexAdd(sex));
};

export const setTags = (tags) => (dispatch) => {
    dispatch(filterTagsAdd(tags));
};

export const setLocation = (location) => (dispatch) => {
    dispatch(filterLocationAdd(location));
};

export const initFilter = () => (dispatch) => {
    dispatch(filterClear());
};

export const sortTypeAdd = (sortType) => ({
    type: ActionTypes.SORT_TYPE_ADD,
    sortType: sortType
});

export const setSort = (sortType) => (dispatch) => {
    dispatch(sortTypeAdd(sortType));
};

export const usersCardAdd = (info) => ({
    type: ActionTypes.USERS_CARD_ADD,
    payload: info.result
});

export const fetchUsersCard = (data) => (dispatch) => {
    dispatch(filterLoading());
    dispatch(setFilterStatus(null));
    console.log('log', data);
    // console.log('data', data);
    return request('/api/user/users/page', data, 'POST')
        .then(response => response.json())
        .then(result => dispatch(usersCardAdd(result)))
        .catch(error => dispatch(filterFailed(error.message)));
};

export const countCardAdd = (count) => ({
    type: ActionTypes.COUNT_CARD_ADD,
    payload: count.result
});

export const fetchAllUsers = (data) => (dispatch) => {
    dispatch(filterLoading());
<<<<<<< HEAD
    console.log('log', data);
=======
    // console.log('log', nickname);
>>>>>>> a28274185dd2cc451822b0947cdfce76bb759716
    return request('/api/user/users/count/pages', data, 'POST')
        .then(response => response.json())
        .then(result => dispatch(countCardAdd(result)))
        .catch(error => dispatch(filterFailed(error.message)));
};
