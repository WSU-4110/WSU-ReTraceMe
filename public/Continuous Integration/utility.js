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

module.exports = Utility;