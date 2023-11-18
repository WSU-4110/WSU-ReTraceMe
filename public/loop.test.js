global.endLoop = false;

const loopEnder = require('./loopEnderFunctions.js');

test('loopEnder sets endLoop to true', () => {
  expect(global.endLoop).toBe(false);
  loopEnder();
  expect(global.endLoop).toBe(true);
});
