var markers = new Map();
var lastClickedMarker = null;
var lastMarkerLocation = null;
var lastMarkerTime = null;
var endLoop = false;

//##TRIP FUNCTIONS##\\

async function startTrip(userLocation) {
    lastMarkerTime = new Date().getTime();
    lastMarkerLocation = userLocation;
    endLoop = false;
    const interval = 1 * 1000; //1 second

    console.log("A trip has been started.");

    while (!endLoop) {
        await sleep(interval);
        getUserLocation(autoPlaceMarker);
    }

    console.log("The trip has ended.");
}

//##MARKER FUNCTIONS##\\

function placeMarker(userLocation) {
    const timestamp = new Date().toLocaleString();
    const markerFactory = new MarkerFactory();
    const newMarker = markerFactory.createMarker(userLocation, timestamp);

    markerClickEvent(newMarker);
    console.log(`Marker placed at ${userLocation} with timestamp: ${timestamp}`);
}

function autoPlaceMarker(userLocation) {
    const interval = 10* 1000;
    const initialTime = lastMarkerTime;
    const currentTime = Date.now();
    const initialLocation = lastMarkerLocation;
    const currentLocation = userLocation;
    const timeElapsed = currentTime - initialTime;
    const distanceTraveled = initialLocation.distanceTo(currentLocation);


    //if ((distanceTraveled >= 10 || (distanceTraveled < 10 && timeElapsed >= interval)) && (initialLocation != currentLocation)) {
    if ((distanceTraveled >= 10) || (distanceTraveled < 10 && timeElapsed >= interval)) {
        console.log("Time Elapsed = " + timeElapsed / 1000 + " seconds");
        console.log("Distance traveled = " + distanceTraveled + " km");
        placeMarker(userLocation);
        lastMarkerTime = Date.now();
        lastMarkerLocation = userLocation;
    }
}

function removeMarker() {
    if (lastClickedMarker) {
        var key = createKey(lastClickedMarker);
        var coords = getMarkerCoords(lastClickedMarker);
        //var timestamp = lastClickedMarker.getProperty('timestamp');

        deleteMarker(key, lastClickedMarker)

        lastClickedMarker = null;

        //console.log("Marker removed at " + coords + " with timestamp: " + timestamp);
        console.log("Marker removed at " + coords);
    }
}

function removeAllMarkers() {
    for (let [key, marker] of markers) {
        deleteMarker(key, marker)
    }
    console.log("All markers removed.")
}

class MarkerFactory {
    createMarker(coords, timestamp) {
    var marker = new tt.Marker({ timestamp: timestamp }).setLngLat(coords).addTo(map)

    setMarkerPopup(marker, coords, timestamp)

    markers.set(createKey(marker), marker)

    return marker;
    }
}

function markerClickEvent(marker) {
    marker.getElement().addEventListener('click', function () {
        lastClickedMarker = marker
    });
}

function setMarkerPopup(marker, coords, timestamp) {
    var popup = new tt.Popup({ offset: 25 }).setHTML('Lng: ' + coords.lng + ' Lat: ' + coords.lat + '<br>Timestamp: ' + timestamp);
    marker.setPopup(popup);
}

function getMarkerCoords(marker) {
    return marker.getLngLat()
}

function deleteMarker(key, marker) {
    marker.remove();
    markers.delete(key);
}

//##LOCATION FUNCTIONS##\\

function getUserLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var userLocation = new tt.LngLat(position.coords.longitude, position.coords.latitude);
            callback(userLocation);
        })
    }
    else {
        console.log("Geolocation is not supported by this browser.")
    }
}

//##UTILITY FUNCTIONS##\\

function createKey(marker) {
    var coords = getMarkerCoords(marker)
    var key = coords.lng + " " + coords.lat;
    return key
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); //from stackoverflow
}

function loopEnder() {
    endLoop = true;
}

//USER DATA FUNCTIONS

function storeLocally(userLocation) {
    localStorage.setItem("latitude", userLocation.lat);
    localStorage.setItem("longitude", userLocation.lng);
}

function retrieveLocalData(userLocation) {
    localStorage.getItem("latitude", userLocation.lat);
    localStorage.getItem("longitude", userLocation.lng);
}

