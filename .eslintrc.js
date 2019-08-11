const baseConfig = require('./packages/eslint-config-base');

module.exports = {
    ...baseConfig,
    plugins: ['jest'],
    env: { 'jest/globals': true },
};
