import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

let state;
let store;

const initStore = (key, reducer) => {
    state = {
        [key]: reducer
    };

    store = createStore(
        combineReducers(state),
        {},
        applyMiddleware(thunk)
    );

    return store;
};

const updateStore = (key, reducer) => {
    state[key] = reducer;

    store.replaceReducer(combineReducers(state));
};

export default {
    initStore,
    updateStore
};