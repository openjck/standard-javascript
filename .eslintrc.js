const baseConfig = require('./packages/eslint-config-base');

module.exports = Object.assign({}, baseConfig, {
    plugins: ['jest'],
    env: { 'jest/globals': true },
});
