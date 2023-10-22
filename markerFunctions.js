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

function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var currentLocation = new tt.LngLat(position.coords.longitude, position.coords.latitude);
            callback(currentLocation);
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

function placeMarker(lngLat) {
    var timestamp = new Date().toLocaleString();
    newMarker = createMarker(lngLat, timestamp)

    markerClickEvent(newMarker);
    console.log(`Marker placed at ${lngLat} with timestamp: ${timestamp}`);
}

function autoPlaceMarker(currentLocation) {
    initialLocation = currentLocation;

    var lastMarkerTime = new Date().getTime();
    var currentTime;
    var timeElapsed;

    var distanceTraveled = calculateDistance(initialLocation.lat, initialLocation.lng, currentLocation.lat, currentLocation.lng);

    var interval = 5000;

    console.log("|#|-------------------------|#|");
    console.log("|#|Begin 5 second time delay|#|");
    console.log("|#|-------------------------|#|");

    setTimeout(function (currentTime, timeElapsed, lastMarkerTime) {
        currentTime = new Date().getTime();
        var timeElapsed = currentTime - lastMarkerTime;

        console.log("timeElapsed = " + timeElapsed / 1000 + " seconds")

        if (distanceTraveled >= 10 || (distanceTraveled < 10 && timeElapsed >= interval)) {
            placeMarker(currentLocation);

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

function createMarker(currentLocation, timestamp) {
    var marker = new tt.Marker({ timestamp: timestamp }).setLngLat(currentLocation).addTo(map)

    setMarkerPopup(marker, currentLocation, timestamp)

    markers.set(createKey(marker), marker)

    return marker;
}

function markerClickEvent(marker) {
    marker.getElement().addEventListener('click', function () {
        lastClickedMarker = marker
    });
}

function setMarkerPopup(marker, lngLat, timestamp) {
    var popup = new tt.Popup({ offset: 25 }).setHTML('Lng: ' + lngLat.lng + ' Lat: ' + lngLat.lat + '<br>Timestamp: ' + timestamp);
    marker.setPopup(popup);
}

function getMarkerCoords(marker) {
    return marker.getLngLat()
}

function deleteMarker(key, marker) {
    marker.remove();
    markers.delete(key);
}