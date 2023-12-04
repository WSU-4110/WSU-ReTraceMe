class Helper {

    constructor() {
    }
    getUserLocation(callback) {
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

}

module.exports = Helper;