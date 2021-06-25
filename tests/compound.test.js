const utils = require('../src/utils');
const lodash = require ('lodash')

test('compound 1 year', () => {
    expect(lodash.round(utils.compounds(2.52,1, 5),2 )).toBe(2.65);
});
