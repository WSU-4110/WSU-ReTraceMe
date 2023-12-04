// Standalone function
function getMarkerCoords(marker){
    return marker.getLngLat();
 }
 
 function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
 }
 
 function loopEnder(){
    endLoop = true;
 }
 
 function createKey(marker) {
    const coords = getMarkerCoords(marker);
    const key = coords.lng + " " + coords.lat;
    return key;
 }
 
 module.exports = createKey;
 