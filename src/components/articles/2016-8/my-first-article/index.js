export default {
    path: '2016/8/21/my-first-article(/:action)',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./index.jsx').default);
        });
    }
};