var markers = new Map(); // initialize hashmap
var lastClickedMarker = null;

//Place marker on map
function placeMarker() {
    navigator.geolocation.getCurrentPosition((position) => {
        var lngLat = new tt.LngLat(position.coords.longitude, position.coords.latitude);

        //Create new instance of marker
        var newMarker = new tt.Marker().setLngLat(lngLat).addTo(map)

        //Insert marker into hashmap
        markers.set(createKey(newMarker), newMarker)

        //Assign popup to marker
        var popup = new tt.Popup({ offset: 25 }).setText('Lng: ' + lngLat.lng + '      Lat: ' + lngLat.lat);
        newMarker.setPopup(popup)

        //Marker listens for click
        newMarker.getElement().addEventListener('click', function () {
            lastClickedMarker = newMarker
        });

        console.log("Marker placed at " + lngLat)
    });
}

function autoPlaceMarker() {
    var interval = 300000; // 5 minutes
    setInterval(placeMarker,interval)
}

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