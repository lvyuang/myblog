export default {
    path: 'signin',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./signin.jsx').default);
        });
    }
};