const MarkerManager = require('./markerManager');
const Utility = require('./utility');
const Helper = require('./helper');
const MarkerLog = require('./markerLog');
const LogManager = require('./logManager');

class tripManager {

    constructor() {
        const interval = 1000;
        this.markerManager = new MarkerManager();
        this.tripUtil = new Utility();
        this.markerLog = new MarkerLog();
        this.logManager = new LogManager();
        this.helper = new Helper()
    }
    markTripAsStarted(userLocation) {
        //display start trip in console log
        this.markerLog.markerCount = 0;

        this.logManager.clear();
        this.logManager.addToLog("A trip has been started.");

        const interval = 1000; //1 second

        this.markerManager.placeMarker(userLocation);

        console.log("A trip has been started.");
        return interval;
    }

    markTripAsEnded() {
        this.tripUtil.endLoop = false;

        console.log("The trip has ended.");

        //display end trip in console log
        this.logManager.addToLog("The trip has ended.");
    }

//TRIP FUNCTIONS

    async startTrip(userLocation) {

        const interval = this.markTripAsStarted(userLocation);

        while (!(this.tripUtil.endLoop)) {
            await this.tripUtil.sleep(interval);
            this.helper.getUserLocation(userLocation => this.markerManager.autoPlaceMarker(userLocation));
        }

        this.markTripAsEnded();

    }
}

module.exports = tripManager;
