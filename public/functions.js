class MarkerFactory {
    constructor(markerManager) {
        this.markerManager = markerManager;
    }

    createMarker(coords, timestamp, color) {
        const markerManager = this.markerManager;
        const util = new Utility();
        var marker = new tt.Marker({ timestamp: timestamp, color: color }).setLngLat(coords).addTo(map);

        markerManager.setMarkerPopup(marker, coords, timestamp);

        markerManager.markers.set(util.createKey(marker), marker);

        return marker;
    }
}

class consoleLog {
    static markerCount = 0;
    static timestamp;

    constructor() {
        consoleLog.timestamp = new Date().toLocaleString();
    }

    getStart() {
        consoleLog.markerCount = 0;
        document.getElementById("consoleLog").value = "";
        document.getElementById("consoleLog").value += `[${consoleLog.timestamp}]: A trip has been started\n`;
    }

    getMarker() {
        consoleLog.markerCount += 1;
        document.getElementById("consoleLog").value += `[${consoleLog.timestamp}]: Marker #${consoleLog.markerCount} placed\n`;
    }

    getRemove() {
        document.getElementById("consoleLog").value += `[${consoleLog.timestamp}]: Marker removed\n`;
    }

    getRemoveAll() {
        document.getElementById("consoleLog").value += `[${consoleLog.timestamp}]: All markers removed\n`;
    }

    getEnd() {
        document.getElementById("consoleLog").value += `[${consoleLog.timestamp}]: The trip has ended\n`;
    }

    getChange() {
        document.getElementById("consoleLog").value += `[${consoleLog.timestamp}]: Toggled light/dark mode\n`;
    }
}

class MarkerManager {
    constructor() {
        this.markers = new Map();
        this.lastClickedMarker = null;
        this.lastMarkerLocation = null;
        this.lastMarkerTime = null;
    }

    placeMarker(userLocation, color) {
        let setColor = 'black'
        setColor = color;
        const timestamp = new Date().toLocaleString();
        const markerFactory = new MarkerFactory(this);
        const newMarker = markerFactory.createMarker(userLocation, timestamp, setColor);

        //Display new marker in console log
        const log = new consoleLog();
        log.getMarker();

        this.lastMarkerTime = Date.now();
        this.lastMarkerLocation = userLocation;

        this.markerClickEvent(newMarker);
        flashDot();
        console.log(`Marker placed at ${userLocation} with timestamp: ${timestamp}`);
    }

    autoPlaceMarker(userLocation) {
        const interval = 30* 1000;
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
        return (distanceTraveled > 3 && timeElapsed >= interval) || (distanceTraveled >= 60);
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
            const remove = new consoleLog();
            remove.getRemove();

            //console.log("Marker removed at " + coords + " with timestamp: " + timestamp);
            console.log("Marker removed at " + coords);
        }
    }

    removeAllMarkers() {
        for (let [key, marker] of this.markers) {
            this.deleteMarker(key, marker)
        }

        //display removal in console log
        const removeAll = new consoleLog();
        removeAll.getRemoveAll();

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
        let markerNumber = consoleLog.markerCount+1;
        const popup = new tt.Popup({ offset: 25 }).setHTML(
            '<div style="font-size: 1em; text-align: center; margin: 0px">' +
                '<div style="">' +
                    '<b> [' + markerNumber + ']</b><br>' + 
                    '------------------<br>' +
                    '' + timestamp + '<br>' +
                '</div>' +
                '<div style="">' +
                    'Lng: ' + coords.lng + '<br>' +
                    'Lat: ' + coords.lat + '' +
                '</div>' +
            '</div>'
        );
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
    //display start trip in console log
    const start = new consoleLog();
    start.getStart();
    

    const interval = 1 * 1000; //1 second

    markerManager.placeMarker(userLocation, 'green');
    flashDot();

    console.log("A trip has been started.");
    // Initially hide the dot
    var dot = document.getElementById('notificationDot');
    dot.style.visibility = 'visible';

    while (!(tripUtil.endLoop)) {
        await tripUtil.sleep(interval);
        getUserLocation(userLocation => markerManager.autoPlaceMarker(userLocation));
        //flashDot();
    }

    tripUtil.endLoop = false;
    getUserLocation(userLocation => markerManager.placeMarker(userLocation, 'red'));
    console.log("The trip has ended.");

    //display end trip in console log
    const end = new consoleLog();
    end.getEnd();
}



function flashDot() {
    var dot = document.getElementById('notificationDot');
    dot.textContent = consoleLog.markerCount; // Set the content of the dot to the current count
    dot.style.visibility = 'visible';
     // Increment count and keep it in the range [0, 9]
}
document.addEventListener('DOMContentLoaded', function () {
    // ... Your existing code ...

    // Add an event listener to reset the red dot counter when console log is clicked
    const consoleLogTextArea = document.getElementById('consoleLog');
    consoleLogTextArea.addEventListener('click', function () {
        // Reset the red dot counter
        resetRedDotCounter();
    });

    // Add an event listener to hide the red dot when the console log is closed
    const menuIcon = document.getElementById('menuIcon');
    menuIcon.addEventListener('click', function () {
        hideRedDot();
    });

    // ... Your existing code ...

    // Function to reset the red dot counter
    function resetRedDotCounter() {
        const dot = document.getElementById('notificationDot');
        dot.textContent = '0';
    }

    // Function to hide the red dot
    function hideRedDot() {
        const dot = document.getElementById('notificationDot');
        dot.style.visibility = 'hidden';
    }
});



const markerManager = new MarkerManager();
const tripUtil = new Utility();
