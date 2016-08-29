export default {
    path: 'reset-password/:hash',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./reset-password.jsx').default);
        });
    }
};