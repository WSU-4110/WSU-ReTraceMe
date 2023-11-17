const createKey = require('./createKeyFunctions.js');

test('Combines lng and lat together into a key.', () => {
  const marker = {
    getLngLat: jest.fn().mockReturnValue({
      lng: 42.5136557,
      lat: -83.0516337
    })
  };

  const expectedKey = "42.5136557 -83.0516337";

  expect(createKey(marker)).toEqual(expectedKey);
});
