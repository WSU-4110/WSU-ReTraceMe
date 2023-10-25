var WSU = { lat: 42.357384, lng: -83.069739 };
var center;

var map = tt.map({
    key: "wWiYy6VgRhpS4PPvp2RT0aDq7o7MTNAD",
    container: "map",
    center: WSU,
    zoom: 18
});

const marker = new tt.Marker().setLngLat(WSU).addTo(map);
const popup = new tt.Popup({ anchor: 'top' }).setText('Wayne State University Campus');
marker.setPopup(popup).togglePopup();

//Perform Geolocation

var geoLocate = new tt.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    fitBoundOptions: {
        maxZoom: 20
    },
    trackUserLocation: true,
    showAccuracyCircle: false
});

map.addControl(geoLocate);

map.on('load', function () {
    geoLocate.trigger();
    map.once('zoomend', function () {
        map.easeTo({zoom: 17, animate: true, essential: true});
    })
})