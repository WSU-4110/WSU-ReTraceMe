const createKey = require('./createKeyFunctions.js');

test('Combines lng and lat together into a key in correct oroder.', () => {
  const marker = {
    getLngLat: jest.fn().mockReturnValue({
      lng: 42.5136557,
      lat: -83.0516337
    })
  };

  const expectedKey = "-83.0516337 42.5136557";

  expect(createKey(marker)).not.toEqual(expectedKey);
});


