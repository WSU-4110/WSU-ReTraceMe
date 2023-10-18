var markers = new Map();

function addMarker() {
    map.once('click', function (event) {
        var lngLat = new tt.LngLat(event.lngLat.lng, event.lngLat.lat)
        var newMarker = new tt.Marker().setLngLat(lngLat).addTo(map)
        markers.set(createKey(newMarker), newMarker)
        console.log(lngLat)
    })
}

function createKey(newMarker){
    var coords = newMarker.getLngLat()
    var key = coords.lng + coords.lat + "";
    return key
}

function removeMarker() {
    map.on('click', function(event) {

        var key = createKey(waypoint)
        var marker = markers.get(key)
        marker.remove()
        markers.delete(key)
    })
}

function removeAllMarkers() {
    for (let [key, marker] of markers) {
            marker.remove();
            markers.delete(key);
    }
}