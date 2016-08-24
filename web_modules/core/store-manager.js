import {combineReducers, createStore} from 'redux';

let state;
let store;

const initStore = (key, reducer) => {
    state = {
        [key]: reducer
    };

    store = createStore(
        combineReducers(state),
        {}
    );

    return store;
};

const updateStore = (key, reducer) => {
    if (state.key) {
        return;
    }

    state[key] = reducer;

    store.replaceReducer(combineReducers(state));
};

export default {
    initStore,
    updateStore
};