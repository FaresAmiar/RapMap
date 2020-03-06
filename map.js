window.onload = function () {
    var map = L.map('map').setView([48.7945, 2.3340], 11);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'PING'}).addTo(map);
    var greenIcon = L.icon({
        iconUrl: 'leaf-green.png',
        shadowUrl: 'leaf-shadow.png',

        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.marker([51.5, -0.09], {icon: greenIcon}).addTo(map);

}

const fetchAsync = async () =>
    await (await fetch('./rapmap.json')).json()

var json = fetchAsync();

console.log(json)

json.then((value) => { enfinTMRCNWAAAR(value)})

function NWAARNWAAR(json) {
    for(var i = 0; i < json.length; ++i) {
        var coord = json[i]['location']['coordinates'];
        var coords = coord.split(',')
        coord = [coords[1].substring(1)]
        coord.push(coords[0])
        console.log(coord)
    }
}