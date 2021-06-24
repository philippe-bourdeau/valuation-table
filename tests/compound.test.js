const utils = require('../src/utils');

test('compound 1 year', () => {
    expect(utils.compounds(2.52,1, 5)).toBe(2.65);
});
