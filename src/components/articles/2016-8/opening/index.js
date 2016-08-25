export default {
    path: '2016/8/24/opening(/:action)',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./index.jsx').default);
        });
    }
};