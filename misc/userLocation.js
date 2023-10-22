function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showLocation, error);
    }

    else {
        console.log("Geolocation is not supported by this browser.")
    }
}

function showLocation(position) {
    var time = new Date(position.timestamp)

    console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude + "<br>Timestamp: " + time.toLocaleTimeString())
}

function error() {
    console.log("Unable to retrieve your location")
}