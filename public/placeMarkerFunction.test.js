const placeMarker = require('./placeMarkerFunction.js');

jest.mock('./placeMarkerFunction.js', () => ({
  createMarker: jest.fn(),
  MarkerFactory: jest.fn(),
  markerLog: jest.fn(),
  markerClickEvent: jest.fn(),
}));

test('Takes in user location and time to create marker information.', () => {
  const userLocation = {
      lng: 42.5136557,
      lat: -83.0516337
  };

  const timestamp = {
      timestamp: "12:00:00"
  };

  placeMarkerFunction.createMarker.mockReturnValue({
    userLocation,
    timestamp
  });

  const expectedKey = "Marker placed at 42.5136557 -83.0516337 with timestamp: 12:00:00";

  expect(placeMarker(userLocation)).toEqual(expectedKey);
});

// const placeMarker = require('./placeMarkerFunction.js');

// test('Takes in user location and time to create marker information.', () => {
//   const userLocation = {
//       lng: 42.5136557,
//       lat: -83.0516337
    
//   };

//   const timestamp = {
//       timestamp: "12:00:00"
//   };

//   createMarker: jest.fn().mockReturnValue({
//     userLocation,
//     timestamp
//   })

//   const expectedKey = "Marker placed at 42.5136557 -83.0516337 with timestamp: 12:00:00";

//   expect(placeMarker(userLocation)).toEqual(expectedKey);
// });
