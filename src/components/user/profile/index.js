export default {
    path: 'profile',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./profile.jsx').default);
        });
    }
};