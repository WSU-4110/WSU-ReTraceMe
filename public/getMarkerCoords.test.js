const getMarkerCoords = require('./getMarkerCoordsFunctions.js');

test('getMarkerCoords returns the longitude and latitude of a marker', () => {
  const mockMarker = {
    getLngLat: jest.fn().mockReturnValue({
      lng: 42.5136557,
      lat: -83.0516337
    })
  };
  
  const expectedCoords = {
    lng: 42.5136557,
    lat: -83.0516337
  };

  expect(getMarkerCoords(mockMarker)).toEqual(expectedCoords);
});
