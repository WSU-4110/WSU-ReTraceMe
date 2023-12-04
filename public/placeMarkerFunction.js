function placeMarker(userLocation) {
    const timestamp = new Date().toLocaleString();
    const markerFactory = new MarkerFactory(this);
    const newMarker = createMarker(userLocation, timestamp);

    const log = new markerLog();
    log.getLog();

    this.lastMarkerTime = Date.now();
    this.lastMarkerLocation = userLocation;

    this.markerClickEvent(newMarker);

    console.log(`Marker placed at ${userLocation} with timestamp: ${timestamp}`);
    return `Marker placed at ${userLocation} with timestamp: ${timestamp}`
}

module.exports = placeMarker;
