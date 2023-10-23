var markers = new Map(); // initialize hashmap
var lastClickedMarker = null;
var initialLocation = null;
var lastMarkerTime = null;

//Location Functions

//From ChatGPT
function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371000; // Radius of the Earth in meters

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

//Utility functions

function createKey(marker) {
    var coords = getMarkerCoords(marker)
    var key = coords.lng + " " + coords.lat;
    return key
}

//Marker functions

function placeMarker(userLocation) {
    var timestamp = new Date().toLocaleString();
    newMarker = createMarker(userLocation, timestamp)

    markerClickEvent(newMarker);
    console.log(`Marker placed at ${userLocation} with timestamp: ${timestamp}`);
}

function autoPlaceMarker(userLocation) {
    initialLocation = userLocation;

    var lastMarkerTime = new Date().getTime();
    var currentTime;
    var timeElapsed;

    var distanceTraveled;

    var interval = 5000;

    console.log("|#|-------------------------|#|");
    console.log("|#|Begin 5 second time delay|#|");
    console.log("|#|-------------------------|#|");

    setTimeout(function (currentTime, timeElapsed, lastMarkerTime) {
        currentTime = new Date().getTime();
        var currentLocation = userLocation;
        timeElapsed = currentTime - lastMarkerTime;
        distanceTraveled = calculateDistance(initialLocation.lat, initialLocation.lng, currentLocation.lat, currentLocation.lng);

        console.log("timeElapsed = " + timeElapsed / 1000 + " seconds")

        if (distanceTraveled >= 10 || (distanceTraveled < 10 && timeElapsed >= interval)) {
            placeMarker(userLocation);

            initialLocation = currentLocation;
            lastMarkerTime = new Date().getTime();
        }

        console.log("|#|-----------------------------|#|");
        console.log("|#|5 second time delay has ended|#|");
        console.log("|#|-----------------------------|#|");

    }, interval, currentTime, timeElapsed, lastMarkerTime);
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