const { amendRule } = require('./utils');

describe('amendRule', () => {
    test('Unexpected values', () => {
        expect(amendRule([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);

        expect(amendRule([1, 2, 3], [null, null, null])).toEqual([1, 2, 3]);

        expect(amendRule([null, null, null], [1, 2, 3])).toEqual([1, 2, 3]);

        expect(amendRule([null, null, null], [null, null, null])).toEqual([
            null,
            null,
            null,
        ]);

        expect(amendRule([1, 2, 3], [])).toEqual([1, 2, 3]);

        expect(amendRule([], [1, 2, 3])).toEqual([1, 2, 3]);

        expect(amendRule([1, 2, 3])).toEqual([1, 2, 3]);

        expect(amendRule([], [])).toEqual([]);
    });

    test('String arguments', () => {
        expect(amendRule('error', 'warning')).toEqual('warning');
        expect(amendRule('error', null)).toEqual('error');
    });

    test('Array arguments including only strings', () => {
        expect(amendRule(['error'], ['warning'])).toEqual(['warning']);
        expect(amendRule(['error'], [null])).toEqual(['error']);
    });

    test('Array arguments including only numbers', () => {
        expect(amendRule([1, 2, 3], [9])).toEqual([9, 2, 3]);
        expect(amendRule([1, 2, 3], [9, null, 7])).toEqual([9, 2, 7]);
        expect(amendRule([1, 2, 3], [9, null, null])).toEqual([9, 2, 3]);
        expect(amendRule([1, 2, 3], [null, 7, 8])).toEqual([1, 7, 8]);
        expect(amendRule([1, 2, 3], [9, 8, 7])).toEqual([9, 8, 7]);
        expect(amendRule([1, 2, 3], [1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(amendRule([1, 2, 3], [1, 9, 3, 8])).toEqual([1, 9, 3, 8]);
    });

    test('Array arguments including only objects', () => {
        expect(
            amendRule(
                [{ red: 1, blue: 2, green: 3 }],
                [{ red: 9, blue: 8, green: 7 }],
            ),
        ).toEqual([{ red: 9, blue: 8, green: 7 }]);

        expect(
            amendRule([{ red: 1, blue: 2, green: 3 }], [{ red: 9 }]),
        ).toEqual([
            {
                red: 9,
                blue: 2,
                green: 3,
            },
        ]);

        expect(
            amendRule(
                [{ red: 1, blue: 2, green: 3 }],
                [{ red: 9, blue: 8, green: 7, opacity: 1 }],
            ),
        ).toEqual([{ red: 9, blue: 8, green: 7, opacity: 1 }]);

        expect(
            amendRule([{ red: 1, blue: 2, green: 3 }], [{ opacity: 1 }]),
        ).toEqual([
            {
                red: 1,
                blue: 2,
                green: 3,
                opacity: 1,
            },
        ]);

        expect(amendRule([{ red: 1, blue: 2, green: 3 }], null)).toEqual([
            {
                red: 1,
                blue: 2,
                green: 3,
            },
        ]);
    });

    test('Array arguments including mixed types', () => {
        expect(
            amendRule(
                ['color', { red: 1, blue: 2, green: 3 }, 'background'],
                ['colour'],
            ),
        ).toEqual(['colour', { red: 1, blue: 2, green: 3 }, 'background']);

        expect(
            amendRule(
                ['color', { red: 1, blue: 2, green: 3 }, 'background'],
                ['color', null, 'foreground'],
            ),
        ).toEqual(['color', { red: 1, blue: 2, green: 3 }, 'foreground']);

        expect(
            amendRule(
                ['color', { red: 1, blue: 2, green: 3 }, 'background'],
                ['color', null, null],
            ),
        ).toEqual(['color', { red: 1, blue: 2, green: 3 }, 'background']);

        expect(
            amendRule(
                ['color', { red: 1, blue: 2, green: 3 }, 'background'],
                ['color', { red: 2, blue: 3, green: 4 }, 'background'],
            ),
        ).toEqual(['color', { red: 2, blue: 3, green: 4 }, 'background']);

        expect(
            amendRule(
                ['color', { red: 1, blue: 2, green: 3 }, 'background'],
                ['color', { red: 9 }, 'foreground'],
            ),
        ).toEqual(['color', { red: 9, blue: 2, green: 3 }, 'foreground']);

        expect(
            amendRule(
                ['color', { red: 1, blue: 2, green: 3 }, 'background'],
                ['color', { opacity: 1 }, 'foreground'],
            ),
        ).toEqual([
            'color',
            { red: 1, blue: 2, green: 3, opacity: 1 },
            'foreground',
        ]);

        expect(
            amendRule(
                ['color', { red: 1, blue: 2, green: 3 }, 'background'],
                [
                    'color',
                    { red: 9, blue: 8, green: 7, opacity: 1 },
                    'foreground',
                ],
            ),
        ).toEqual([
            'color',
            { red: 9, blue: 8, green: 7, opacity: 1 },
            'foreground',
        ]);

        expect(
            amendRule('error', ['warning', { red: 1, blue: 2, green: 3 }]),
        ).toEqual(['warning', { red: 1, blue: 2, green: 3 }]);

        expect(
            amendRule('error', [null, { red: 1, blue: 2, green: 3 }]),
        ).toEqual(['error', { red: 1, blue: 2, green: 3 }]);

        expect(
            amendRule(
                ['error', { red: { colorful: true } }],
                [null, { red: {} }],
            ),
        ).toEqual(['error', { red: {} }]);

        expect(
            amendRule(
                ['error', { red: { colorful: true } }],
                [null, { red: null }],
            ),
        ).toEqual(['error', { red: null }]);
    });

    test('Mixed arguments', () => {
        expect(amendRule([1, 2, 3], 'error')).toEqual('error');
    });
});
