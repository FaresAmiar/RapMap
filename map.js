var map ;
var greenIcon;
window.onload = function () {
    map = L.map('map').setView([48.7945, 2.3340], 11);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'PING'}).addTo(map);
    greenIcon = L.icon({
        iconUrl: 'leaf-green.png',
        shadowUrl: 'leaf-shadow.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

}

const fetchAsync = async () =>
    await (await fetch('./rapmap.json')).json()

var json = fetchAsync();

console.log(json)

json.then((value) => { locatione(value)})

function locatione(json) {
    for(var i = 0; i < json.length; ++i) {
        var coord = json[i]['location']['coordinates'];
        var coords = coord.split(',')
        coord = [coords[1].substring(1)]
        coord.push(coords[0])
        L.marker(coord,{icon : greenIcon}).addTo(map);
    }
    console.log("afficher")
}