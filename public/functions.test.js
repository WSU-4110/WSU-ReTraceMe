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


