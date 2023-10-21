var markers = new Map(); // initialize hashmap
var lastClickedMarker = null;

//Place marker on map
function placeMarker() {
    navigator.geolocation.getCurrentPosition((position) => {
        var lngLat = new tt.LngLat(position.coords.longitude, position.coords.latitude);
        var timeStamp = new Date().toLocaleString()//added cirrent timestamp

        //Create new instance of marker, update: added the timestamp property
        var newMarker = new tt.Marker({timeStamp:timeStamp}).setLngLat(lngLat).addTo(map)

        //Insert marker into hashmap
        markers.set(createKey(newMarker), newMarker)

        //Assign popup to marker add the timestamp
        var popup = new tt.Popup({ offset: 25 }).setText('Lng: ' + lngLat.lng + '      Lat: ' + lngLat.lat+'<br> Timestamp:'+timeStamp);
        newMarker.setPopup(popup)

        //Marker listens for click
        newMarker.getElement().addEventListener('click', function () {
            lastClickedMarker = newMarker
        });

        console.log("Marker placed at " + lngLat+"Timestamp: "+timeStamp)
    });
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
        var timeStamp = lastClickedMarker.getProperty('timestamp');

        console.log("Marker removed at " + coords+" remove timestamp"+timeStamp)
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