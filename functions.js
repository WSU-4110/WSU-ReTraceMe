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
    const interval = 5000; //5 seconds

    console.log("A trip has been started.");

    while (!endLoop) {
        await sleep(interval);
        autoPlaceMarker(userLocation);
    }

    console.log("The trip has ended.");
}

//##MARKER FUNCTIONS##\\

function placeMarker(userLocation) {
    var timestamp = new Date().toLocaleString();
    newMarker = createMarker(userLocation, timestamp)

    markerClickEvent(newMarker);
    console.log(`Marker placed at ${userLocation} with timestamp: ${timestamp}`);
}

function autoPlaceMarker(userLocation) {
    const interval = 10000;
    const initialTime = lastMarkerTime;
    const currentTime = Date.now();
    const initialLocation = lastMarkerLocation;
    const currentLocation = userLocation;
    const timeElapsed = currentTime - initialTime;
    const distanceTraveled = calculateDistance(initialLocation.lat, initialLocation.lng, currentLocation.lat, currentLocation.lng);

    console.log("timeElapsed = " + timeElapsed / 1000 + " seconds");

    if ((distanceTraveled >= 10 || (distanceTraveled < 10 && timeElapsed >= interval)) && (initialLocation != currentLocation)) {
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

function createMarker(coords, timestamp) {
    var marker = new tt.Marker({ timestamp: timestamp }).setLngLat(coords).addTo(map)

    setMarkerPopup(marker, coords, timestamp)

    markers.set(createKey(marker), marker)

    return marker;
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

function calculateDistance(lat1, lon1, lat2, lon2) { //from chatgpt
    const earthRadius = 6371000; 

    const degToRad = (degrees) => (degrees * Math.PI) / 180;
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
}

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