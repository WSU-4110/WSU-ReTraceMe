var markers = new Array();
function addMarker() {
    map.once('click', function (event) {
        var lngLat = new tt.LngLat(event.lngLat.lng, event.lngLat.lat)
        var newMarker = new tt.Marker().setLngLat(lngLat).addTo(map)
        markers.push(newMarker)
        console.log(lngLat)
    })
}

function removeMarker() {
    markers[markers.length - 1].remove()
    markers.pop()
}

function removeAllMarkers() {
    for (let i = markers.length - 1; i >= 0; i--) {
        console.log("i = ", i)
        markers[i].remove()
        markers.pop()
    }
}