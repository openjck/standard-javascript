const style = require('eslint-config-airbnb-base/rules/style');
const variables = require('eslint-config-airbnb-base/rules/variables');
const bestPractices = require('eslint-config-airbnb-base/rules/best-practices');
const es6 = require('eslint-config-airbnb-base/rules/es6');
const { amendRule } = require('./utils');

const defaults = Object.assign(
    {},
    style.rules,
    variables.rules,
    bestPractices.rules,
    es6.rules,
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
            null,
            { allowForLoopAfterthoughts: true },
        ]),

        // Change some airbnb rules that conflict with Prettier style
        'operator-linebreak': amendRule(defaults['operator-linebreak'], [
            null,
            'after',

            // Allow multi-line assignment, which Prettier will use if an
            // assignment is longer than 80 characters.
            {
                overrides: Object.assign(
                    {},
                    defaults['operator-linebreak'][2].overrides,
                    { '=': 'after' },
                ),
            },
        ]),
        'object-curly-newline': 'off',
        'arrow-parens': amendRule(defaults['arrow-parens'], [
            null,
            null,
            {
                requireForBlockBody: false,
            },
        ]),
    },
};
