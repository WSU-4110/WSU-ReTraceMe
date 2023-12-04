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

        //Display new marker in console log
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


        if (this.shouldAutoPlace(distanceTraveled, timeElapsed, interval)) {
            console.log("Time Elapsed = " + timeElapsed / 1000 + " seconds");
            console.log("Distance traveled = " + distanceTraveled + " km");
            this.placeMarker(userLocation);
        }
    }

    shouldAutoPlace(distanceTraveled, timeElapsed, interval) {
        return (distanceTraveled > 3 && timeElapsed >= interval) || (distanceTraveled >= 10);
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

            //display removal in console log
            const timestamp = new Date().toLocaleString();
            document.getElementById("consoleLog").value += `[${timestamp}]: Marker removed\n`;

            //console.log("Marker removed at " + coords + " with timestamp: " + timestamp);
            console.log("Marker removed at " + coords);
        }
    }

    removeAllMarkers() {
        for (let [key, marker] of this.markers) {
            this.deleteMarker(key, marker)
        }

        //display removal in console log
        const timestamp = new Date().toLocaleString();
        document.getElementById("consoleLog").value += `[${timestamp}]: All markers removed\n`;

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

module.exports = MarkerManager;