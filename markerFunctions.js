var markers = new Map();
var lastClickedMarker = null;

function addMarker() {
    map.once('click', function (event) {
        var lngLat = new tt.LngLat(event.lngLat.lng, event.lngLat.lat)
        var newMarker = new tt.Marker().setLngLat(lngLat).addTo(map)
        markers.set(createKey(newMarker), newMarker)
        
        var popup = new tt.Popup({offset: 25}).setText('Lng: ' + lngLat.lng + '      Lat: ' + lngLat.lat);        
        newMarker.setPopup(popup);

        newMarker.getElement().addEventListener('click', function() {
           lastClickedMarker = newMarker;
        });

        console.log(lngLat)
    })
}


function createKey(newMarker){
    var coords = newMarker.getLngLat()
    var key = coords.lng + coords.lat + "";
    return key
}

function removeMarker() {
    if(lastClickedMarker){
        var key = createKey(lastClickedMarker);
        lastClickedMarker.remove();
        markers.delete(key);
        lastClickedMarker = null;
    }
}



function removeAllMarkers() {
    for (let [key, marker] of markers) {
            marker.remove();
            markers.delete(key);
    }
}