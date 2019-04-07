const style = require('eslint-config-airbnb-base/rules/style');
const variables = require('eslint-config-airbnb-base/rules/variables');
const bestPractices = require('eslint-config-airbnb-base/rules/best-practices');
const { amendRule } = require('./utils');

const defaults = Object.assign(
    {},
    style.rules,
    variables.rules,
    bestPractices.rules,
);

module.exports = {
    extends: ['airbnb-base'],
    rules: {
        indent: amendRule(defaults.indent, [null, 4]),
        'no-shadow': amendRule(defaults['no-shadow'], [
            null,
            { builtinGlobals: true },
        ]),
        'no-redeclare': amendRule(defaults['no-redeclare'], [
            null,
            { builtinGlobals: true },
        ]),
        'no-plusplus': amendRule(defaults['no-plusplus'], [
            { allowForLoopAfterthoughts: true },
        ]),

        // Change some airbnb rules that conflict with Prettier style
        'operator-linebreak': amendRule(defaults['operator-linebreak'], [
            null,
            'after',
        ]),
        'object-curly-newline': 'off',
    },
};
