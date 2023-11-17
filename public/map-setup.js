var WSU = { lat: 42.357384, lng: -83.069739 };
var center;
let style = 'light';

var map = tt.map({
    key: "wWiYy6VgRhpS4PPvp2RT0aDq7o7MTNAD",
    container: "map",
    center: WSU,
    zoom: 18,
    style: 'https://api.tomtom.com/style/1/style/22.2.1-*/?map=2/basic_street-light&poi=2/poi_light'
});


function changeStyle() {
    if (style == 'light') {
        style = 'dark';
    }
    else {
        style = 'light';
    }
    map.setStyle('https://api.tomtom.com/style/1/style/22.2.1-*/?map=2/basic_street-' + style + '&poi=2/poi_' + style);
    const mode = new consoleLog();
    mode.getChange();
}

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