class MarkerFactory {
    constructor(markerManager) {
        this.markerManager = markerManager;
    }

    createMarker(coords, timestamp) {
        const markerManager = this.markerManager;
        const util = new Utility();
        var marker = new tt.Marker({ timestamp: timestamp }).setLngLat(coords).addTo(map);

        markerManager.setMarkerPopup(marker, coords, timestamp);

        markerManager.markers.set(util.createKey(marker), marker);

        return marker;
    }
}

class markerLog {
    static markerCount = 0;
    

    constructor() {
        const timestamp = new Date().toLocaleString();
        markerLog.markerCount += 1;
        this.log = `Marker #${markerLog.markerCount} timestamp: ${timestamp}\n`;
    }

    getLog() {
        document.getElementById("consoleLog").value += this.log;
    }
}

class MarkerManager {
    constructor() {
        this.markers = new Map();
        this.lastClickedMarker = null;
        this.lastMarkerLocation = null;
        this.lastMarkerTime = null;
    }

    placeMarker(userLocation) {
        const timestamp = new Date().toLocaleString();
        const markerFactory = new MarkerFactory(this);
        const newMarker = markerFactory.createMarker(userLocation, timestamp);

        const log = new markerLog();
        log.getLog();

        this.lastMarkerTime = Date.now();
        this.lastMarkerLocation = userLocation;

        this.markerClickEvent(newMarker);

        console.log(`Marker placed at ${userLocation} with timestamp: ${timestamp}`);
    }

    autoPlaceMarker(userLocation) {
        const interval = 10* 1000;
        const currentTime = Date.now();
        const initialTime = this.lastMarkerTime;
        const timeElapsed = currentTime - initialTime;
        const distanceTraveled = (this.lastMarkerLocation).distanceTo(userLocation);


        //if ((distanceTraveled >= 10 || (distanceTraveled < 10 && timeElapsed >= interval)) && (initialLocation != currentLocation)) {
        if ((distanceTraveled >= 10) || (distanceTraveled < 10 && timeElapsed >= interval)) {
            console.log("Time Elapsed = " + timeElapsed / 1000 + " seconds");
            console.log("Distance traveled = " + distanceTraveled + " km");
            this.placeMarker(userLocation);
        }
    }

    removeMarker() {
        if (this.lastClickedMarker) {
            const util = new Utility();
            const markerUtil = new MarkerUtility();
            const key = util.createKey(this.lastClickedMarker);
            const coords = markerUtil.getMarkerCoords(this.lastClickedMarker);
            //var timestamp = lastClickedMarker.getProperty('timestamp');

            this.deleteMarker(key, this.lastClickedMarker)
 
            this.lastClickedMarker = null;

            //console.log("Marker removed at " + coords + " with timestamp: " + timestamp);
            console.log("Marker removed at " + coords);
        }
    }

    removeAllMarkers() {
        for (let [key, marker] of this.markers) {
            this.deleteMarker(key, marker)
        }
        console.log("All markers removed.")
    }

    markerClickEvent(marker) {
        marker.getElement().addEventListener('click', () => {
            const markerUtil = new MarkerUtility();

            this.lastClickedMarker = marker;
            const coords = markerUtil.getMarkerCoords(this.lastClickedMarker);
            console.log("last click: " + coords)
        });
    }

    setMarkerPopup(marker, coords, timestamp) {
        const popup = new tt.Popup({ offset: 25 }).setHTML('Lng: ' + coords.lng + ' Lat: ' + coords.lat + '<br>Timestamp: ' + timestamp);
        marker.setPopup(popup);
    }

    deleteMarker(key, marker) {
        marker.remove();
        this.markers.delete(key);
    }
}

class MarkerUtility{
    getMarkerCoords(marker) {
        return marker.getLngLat()
    }
}

class Utility {
    constructor() {
        this.endLoop = false;
    }

    createKey(marker) {
        const markerUtil = new MarkerUtility();
        const coords = markerUtil.getMarkerCoords(marker);
        const key = coords.lng + " " + coords.lat;
        return key
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms)); //from stackoverflow
    }

    loopEnder() {
        this.endLoop = true;
    }
}

//LOCATION FUNCTIONS
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


//USER DATA FUNCTIONS

function storeLocally(userLocation) {
    localStorage.setItem("latitude", userLocation.lat);
    localStorage.setItem("longitude", userLocation.lng);
}

function retrieveLocalData(userLocation) {
    localStorage.getItem("latitude", userLocation.lat);
    localStorage.getItem("longitude", userLocation.lng);
}

//TRIP FUNCTIONS
async function startTrip(userLocation) {
    const interval = 1 * 1000; //1 second

    markerManager.placeMarker(userLocation);

    console.log("A trip has been started.");

    while (!(tripUtil.endLoop)) {
        await tripUtil.sleep(interval);
        getUserLocation(userLocation => markerManager.autoPlaceMarker(userLocation));
    }

    tripUtil.endLoop = false;

    console.log("The trip has ended.");
}

const markerManager = new MarkerManager();
const tripUtil = new Utility();

