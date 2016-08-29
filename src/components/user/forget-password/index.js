export default {
    path: 'forget-password',
    getComponent: (nextState, cb) => {
        require.ensure([], (require) => {
            cb(null, require('./forget-password.jsx').default);
        });
    }
};