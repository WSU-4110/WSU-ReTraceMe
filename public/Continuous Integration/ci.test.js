// Kyle Tests
markerCount = 0;

// Test trip start message
async function getStart() {
    markerCount = 0;
    timestamp = new Date().toLocaleString();
    //document.getElementById("consoleLog").value = "";
    //document.getElementById("consoleLog").value += `[${timestamp}]: A trip has been started\n`;
    return { count: markerCount, message: `[${timestamp}]: A trip has been started\n` };
}


test('Should return the current time and start trip message. Also markerCount should be reset to 0', async () => {
    const result = await getStart();
    timestamp = new Date().toLocaleString();

    expect(result.message).toBe(`[${timestamp}]: A trip has been started\n`);
    expect(result.count).toBe(0);
}); 


// Test marker placement message
async function getMarker() {
    markerCount += 1;
    timestamp = new Date().toLocaleString()
    //document.getElementById("consoleLog").value += `[${timestamp}]: Marker #${markerCount} placed\n`;
    return { message: `[${timestamp}]: Marker #${markerCount} placed\n` };
}


test('Should return proper time, marker number, and message', async () => {
    // Test 2 marker runs to ensure markerCount is getting counted properly
    const result1 = await getMarker();
    timestamp = new Date().toLocaleString();

    expect(result1.message).toBe(`[${timestamp}]: Marker #1 placed\n`);

    const result2 = await getMarker();
    timestamp = new Date().toLocaleString();

    expect(result2.message).toBe(`[${timestamp}]: Marker #2 placed\n`);
}); 


// Test marker removal message
async function getRemove() {
    timestamp = new Date().toLocaleString()
    //document.getElementById("consoleLog").value += `[${timestamp}]: Marker removed\n`;
    return { message: `[${timestamp}]: Marker removed\n` };
}


test('Should return current time and marker removed message', async () => {
    const result = await getRemove();
    timestamp = new Date().toLocaleString();

    expect(result.message).toBe(`[${timestamp}]: Marker removed\n`);
}); 


// Test all markers removed message
async function getRemoveAll() {
    timestamp = new Date().toLocaleString()
    //document.getElementById("consoleLog").value += `[${timestamp}]: All markers removed\n`;
    return { message: `[${timestamp}]: All markers removed\n` };
}


test('Should return correct time and  all markers removed message', async () => {
    const result = await getRemoveAll();
    timestamp = new Date().toLocaleString();

    expect(result.message).toBe(`[${timestamp}]: All markers removed\n`);
}); 


// Test end trip function
async function getEnd() {
    markerCount = 0;
    timestamp = new Date().toLocaleString()
    //document.getElementById("consoleLog").value += `[${timestamp}]: The trip has ended\n`;
    return { count: markerCount, message: `[${timestamp}]: The trip has ended\n` };
}


test('Should return the correct time and end trip message. Also markerCount should be reset to 0', async () => {
    const result = await getEnd();
    timestamp = new Date().toLocaleString();

    expect(result.message).toBe(`[${timestamp}]: The trip has ended\n`);
    expect(result.count).toBe(0);
}); 


async function getChange() {
    timestamp = new Date().toLocaleString()
    //document.getElementById("consoleLog").value += `[${timestamp}]: Toggled light/dark mode\n`;
    return { message: `[${timestamp}]: Toggled light/dark mode\n` };
}


test('Should return proper time and change mode message', async () => {
    const result = await getChange();
    timestamp = new Date().toLocaleString();

    expect(result.message).toBe(`[${timestamp}]: Toggled light/dark mode\n`);
}); 













// Hasan Tests
 let createKey = require('./createKeyFunctions.js');

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



let createKey2 = require('./createKeyFunctions.js');

test('Combines lng and lat together into a key in correct oroder.', () => {
  const marker = {
    getLngLat: jest.fn().mockReturnValue({
      lng: 42.5136557,
      lat: -83.0516337
    })
  };

  const expectedKey = "-83.0516337 42.5136557";

  expect(createKey2(marker)).not.toEqual(expectedKey);
});


let createKey3 = require('./createKeyFunctions.js');

test('Combines lng and lat together into a key.', () => {
  const marker = {
    getLngLat: jest.fn().mockReturnValue({
      lng: "42.5136557",
      lat: "-83.0516337"
    })
  };

  const expectedKey = "42.5136557 -83.0516337";

  expect(createKey3(marker)).toEqual(expectedKey);
});



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




global.endLoop = false;

const loopEnder = require('./loopEnderFunctions.js');

test('loopEnder sets endLoop to true', () => {
  expect(global.endLoop).toBe(false);
  loopEnder();
  expect(global.endLoop).toBe(true);
});


jest.useFakeTimers();

test('sleep function pauses execution for specified time', async () => {
  const sleep = require('./sleepFunctions.js');

  const callback = jest.fn();

  sleep(1000).then(callback);

  expect(callback).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1000);

  await Promise.resolve(); 
  expect(callback).toHaveBeenCalled();
});







// Will Tests
class LocationStorage {
  static storeLatitude(latitude) {
      localStorage.setItem("latitude", latitude);
  }

  static storeLongitude(longitude) {
      localStorage.setItem("longitude", longitude);
  }

  static storeTimestamp(timestamp) {
      localStorage.setItem("Timestamp", timestamp);
  }

  static retrieveLatitude() {
      return localStorage.getItem("latitude");
  }

  static retrieveLongitude() {
      return localStorage.getItem("longitude");
  }

  static retrieveTimestamp() {
      return localStorage.getItem("Timestamp");
  }
}

describe('LocationStorage', () => {
  // Mock localStorage before each test
  beforeEach(() => {
      const localStorageMock = {
          getItem: jest.fn(),
          setItem: jest.fn(),
          removeItem: jest.fn(),
      };
      global.localStorage = localStorageMock;
  });

  // Store Latitude
  it('should store latitude in localStorage', () => {
      const latitude = 40.7128;
      LocationStorage.storeLatitude(latitude);
      expect(localStorage.setItem).toHaveBeenCalledWith("latitude", latitude);
  });

  it('should store longitude in localStorage', () => {
      const longitude = -74.0060;
      LocationStorage.storeLongitude(longitude);
      expect(localStorage.setItem).toHaveBeenCalledWith("longitude", longitude);
  });

  // Store Timestamp
  it('should store timestamp in localStorage', () => {
      const timestamp = new Date().toISOString();
      LocationStorage.storeTimestamp(timestamp);
      expect(localStorage.setItem).toHaveBeenCalledWith("Timestamp", timestamp);
  });

  // Retrieve Latitude
  it('should retrieve latitude from localStorage', () => {
      const latitude = 40.7128;
      localStorage.getItem.mockReturnValue(latitude.toString());
      expect(LocationStorage.retrieveLatitude()).toBe(latitude.toString());
  });

  // Retrieve Longitude
  it('should retrieve longitude from localStorage', () => {
      const longitude = -74.0060;
      localStorage.getItem.mockReturnValue(longitude.toString());
      expect(LocationStorage.retrieveLongitude()).toBe(longitude.toString());
  });

  // Retrieve Timestamp
  it('should retrieve timestamp from localStorage', () => {
      const timestamp = new Date().toISOString();
      localStorage.getItem.mockReturnValue(timestamp);
      expect(LocationStorage.retrieveTimestamp()).toBe(timestamp);
  });

});






// Tristan Tests
const { MarkerManager, MarkerFactory, Utility, MarkerUtility } = require('./functions.js');

test('at least 10 seconds have passed and at least 3 meters were traveled', () => {

    const mockDistanceTraveled = 4;
    const mockTimeElapsed = 11;
    const markerManager = new MarkerManager();

    expect(markerManager.shouldAutoPlace(mockDistanceTraveled, mockTimeElapsed, 10)).toBeTruthy();
});

test('Marker is removed from map', () => {
    const mockMarker = {
        getLngLat: jest.fn().mockReturnValue({
            lng: 42.5136557,
            lat: -83.0516337
        })
    };

    const util = new Utility();
    const key = util.createKey(mockMarker);

    const mock_delete_marker = jest.fn();

    MarkerManager.prototype.deleteMarker = mock_delete_marker;
    const markerManager = new MarkerManager();

    markerManager.markers.set(key, mockMarker);
    markerManager.lastClickedMarker = mockMarker;
    mock_delete_marker.mockReturnValue(markerManager.markers.delete(key));

    markerManager.removeMarker();

    expect(markerManager.markers.get(key)).toBeUndefined();
});


test('All markers removed from map', () => {
    
    const util = new Utility();

    const mock_delete_marker = jest.fn();
    MarkerManager.prototype.deleteMarker = mock_delete_marker;
    const markerManager = new MarkerManager();

    const mockMarker1 = {
        getLngLat: jest.fn().mockReturnValue({
            lng: 42.5,
            lat: -83.0516337
        })
    };

    const mockMarker2 = {
        getLngLat: jest.fn().mockReturnValue({
            lng: 42.51,
            lat: -83.0516337
        })
    };

    const mockMarker3 = {
        getLngLat: jest.fn().mockReturnValue({
            lng: 42.513,
            lat: -83.0516337
        })
    };

    markerManager.markers.set(util.createKey(mockMarker1), mockMarker1);
    markerManager.markers.set(util.createKey(mockMarker2), mockMarker2);
    markerManager.markers.set(util.createKey(mockMarker3), mockMarker3);

    markerManager.removeAllMarkers();

    expect(markerManager.deleteMarker).toHaveBeenCalledWith(util.createKey(mockMarker1), mockMarker1);
    expect(markerManager.deleteMarker).toHaveBeenCalledWith(util.createKey(mockMarker2), mockMarker2);
    expect(markerManager.deleteMarker).toHaveBeenCalledWith(util.createKey(mockMarker3), mockMarker3);

});

test('Marker is listening for clicks', () => {
    const markerManager = new MarkerManager();
    let mockMarker = {
        getElement: jest.fn(),
        getLngLat: jest.fn().mockReturnValue({
            lng: 42.513,
            lat: -83.0516337
        })
    };

    const mockElement = {
        addEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    };

    mockMarker.getElement.mockReturnValue(mockElement);

    markerManager.markerClickEvent(mockMarker);

    expect(mockElement.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
});

test('Marker deleted from hash map', () => {
    const mockMarker = {
        getLngLat: jest.fn().mockReturnValue({
            lng: 42.513,
            lat: -83.0516337
        }),
        remove: jest.fn()
    };

    markerManager = new MarkerManager();
    markerManager.markers.set(mockMarker.getLngLat(), mockMarker);

    markerManager.deleteMarker(mockMarker);

    expect(markerManager.markers.get(mockMarker.getLngLat)).toBeUndefined();
});

test('Marker placed on map', () => {
    const mockLocation = {
        lng: 42.513,
        lat: -83.0516337
    };

    const mockMarker = {
        getLngLat: jest.fn().mockReturnValue({
            lng: 42.513,
            lat: -83.0516337
        }),
    };

    const mockTime = Date.now();

    const mockCreateMarker = jest.fn();
    MarkerFactory.prototype.createMarker = mockCreateMarker;

    const mockClickEvent = jest.fn();
    MarkerManager.prototype.markerClickEvent = mockClickEvent;
    
    const markerFactory = new MarkerFactory();
    const markerManager = new MarkerManager();


    markerManager.placeMarker(mockLocation);

    expect(markerManager.lastMarkerLocation).toBe(mockLocation);
    expect(markerManager.lastMarkerTime).toBe(mockTime);
});



// Muhammad Tests
const Helper = require('./helper');
let TripManager = require("./tripManager");
/*
describe('helper', () => {
    let helper;

    //let geoMock = jest.mock(navigator.geolocation);
   // navigator.geolocation.getCurrentPosition.mockResolvedValue({ lat: 123, lon: 456 });

    beforeEach(() => {
        helper = new Helper();
    });

    test('log geolocation not supported', () => {
        navigator.geolocation = undefined;

        let spy = jest.spyOn(console, 'log');

        helper.getUserLocation(1);

        expect(spy).toHaveBeenCalledWith("Geolocation is not supported by this browser.")
    });


    test('call getCurrentPosition', async () => {
        const mockCallback = jest.fn({lat: 123, lon: 456});
        navigator.geolocation = true;

        helper.getUserLocation(mockCallback);

        expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    });
});
*/
TripManager = require('./tripManager');

jest.mock('./markerManager');
jest.mock('./logManager');

describe('tripManager', () => {
    let tripManager;

    beforeEach(() => {
        tripManager = new TripManager();
    });

    describe('markTripAsStarted', () => {
        test('get 1000', () => {
            expect(tripManager.markTripAsStarted()).toBe(1000);
        });

        test('should clear console and call addToLog', () => {
            let spy = jest.spyOn(console,"log");
            let spy1 = jest.spyOn(tripManager.logManager, "clear");
            let spy2 = jest.spyOn(tripManager.logManager, "addToLog");

            tripManager.markTripAsStarted();

            expect(spy).toHaveBeenCalledWith("A trip has been started.");
            expect(spy1).toHaveBeenCalledTimes(1);
            expect(spy2).toHaveBeenCalledWith("A trip has been started.");
        });
    });

    describe('markTripAsEnded', () => {
        test('mark endLoop as false', () => {
            let spy = jest.spyOn(console,"log");
            let spy2 = jest.spyOn(tripManager.logManager, "addToLog");

            tripManager.markTripAsEnded();

            expect(tripManager.tripUtil.endLoop).toBe(false);
            expect(spy).toHaveBeenCalledWith("The trip has ended.");
        });
    });

    describe('startTrip', () => {
        test('should call markTripAsStarted', () => {
            let spy = jest.spyOn(tripManager, 'markTripAsStarted');

            tripManager.startTrip(1);

            expect(spy).toHaveBeenCalledTimes(1);
        });

        test('should call markTripAsEnded and not go into while loop', async () => {
            let spy = jest.spyOn(tripManager, 'markTripAsStarted');
            let spy4 = jest.spyOn(tripManager, 'markTripAsEnded');
            let spy2 = jest.spyOn(tripManager.tripUtil, 'sleep');
            let spy3 = jest.spyOn(tripManager.helper, 'getUserLocation');

            tripManager.tripUtil.endLoop = true;

            await tripManager.startTrip(1).then(() => {
                expect(spy).toHaveBeenCalledTimes(1);
                expect(spy2).not.toHaveBeenCalled();
                expect(spy3).not.toHaveBeenCalled();
                expect(spy4).toHaveBeenCalled();
            });

        });
    });

});
