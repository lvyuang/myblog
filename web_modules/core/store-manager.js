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

const getStore = () => {
    return store;
};

export default {
    initStore,
    updateStore,
    getStore
};