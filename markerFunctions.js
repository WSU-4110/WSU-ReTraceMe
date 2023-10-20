var markers = new Map(); // initialize hashmap
var lastClickedMarker = null;
var initialLocation = null;
var lastMarkerTime = null;

//From ChatGPT
function coordDistanceInMeters(lat1, lon1, lat2, lon2) {
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

//Place marker automatically after a set time or distance
function autoPlaceMarker(currentLocation) {
    initialLocation = currentLocation;

    var lastMarkerTime = new Date().getTime();
    var currentTime;
    var timeElapsed;

    var distanceTraveled = coordDistanceInMeters(initialLocation.lat, initialLocation.lng, currentLocation.lat, currentLocation.lng);

    var interval = 5000;

    console.log("|#|-------------------------|#|");
    console.log("|#|Begin 5 second time delay|#|");
    console.log("|#|-------------------------|#|");

    setTimeout(function (currentTime, timeElapsed, lastMarkerTime)
    {
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

//Place marker on map
function placeMarker(currentLocation) {
        //Create new instance of marker
    var newMarker = new tt.Marker().setLngLat(currentLocation).addTo(map)

        //Insert marker into hashmap
        markers.set(createKey(newMarker), newMarker)

        //Assign popup to marker
    var popup = new tt.Popup({ offset: 25 }).setText('Lng: ' + currentLocation.lng + '      Lat: ' + currentLocation.lat);
        newMarker.setPopup(popup)

        //Marker listens for click
        newMarker.getElement().addEventListener('click', function () {
            lastClickedMarker = newMarker
        });

        console.log("Marker placed at " + currentLocation)
}

//User places marker
//function userPlaceMarker() {}

//Generate key for hash map
function createKey(newMarker){
    var coords = newMarker.getLngLat()
    var key = coords.lng + " " + coords.lat;
    return key
}

//Remove last clicked marker
function removeMarker() {
    if(lastClickedMarker){
        var key = createKey(lastClickedMarker);
        var coords = lastClickedMarker.getLngLat()

        lastClickedMarker.remove();
        markers.delete(key);
        lastClickedMarker = null;

        console.log("Marker removed at " + coords)
    }
}

//Remove every marker
function removeAllMarkers() {
    for (let [key, marker] of markers) {
            marker.remove();
            markers.delete(key);
    }

    console.log("All markers removed.")
}