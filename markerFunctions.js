var markers = new Map();
var lastClickedMarker = null;

function placeMarker(lngLat) {
    var newMarker = new tt.Marker().setLngLat(lngLat).addTo(map)
    markers.set(createKey(newMarker), newMarker)

    var popup = new tt.Popup({ offset: 25 }).setText('Lng: ' + lngLat.lng + '      Lat: ' + lngLat.lat);
    newMarker.setPopup(popup)

    newMarker.getElement().addEventListener('click', function () {
        lastClickedMarker = newMarker
    });

    console.log("Marker placed at " + lngLat)
}

function userPlaceMarker() {
    map.once('click', function (event) {
        var lngLat = new tt.LngLat(event.lngLat.lng, event.lngLat.lat)
        placeMarker(lngLat)
    })
}

function createKey(newMarker){
    var coords = newMarker.getLngLat()
    var key = coords.lng + " " + coords.lat;
    return key
}

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

function removeAllMarkers() {
    for (let [key, marker] of markers) {
            marker.remove();
            markers.delete(key);
    }

    console.log("All markers removed.")
}