let map;
let json;
let id = 0;
let img;

var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [38, 95],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
});

$(document).ready(function () {
    definirMap()
})

function definirMap() {

    map = L.map('map').setView([48.7945, 2.3340], 11);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'PING'}).addTo(map);
}
    let greenIcon = L.icon({
        iconUrl: 'leaf-green.png',
        shadowUrl: 'leaf-shadow.png',
        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    })

    async function fetchAsync () {
		$.getJSON("./rapmap.json", (data) => {
			json = data;
			locatione(json);
			});
	}
	
    fetchAsync();
	
    // json.then((value) => { locatione(value)});

    function locatione(json) {
        for(var i = 0; i < 3; ++i) {
            var coord = json[i]['location']['coordinates'];
            var coords = coord.split(',')
            coord = [coords[1].substring(1)]
            coord.push(coords[0])
            getImage(json[i]['name'])
            console.log(`First name: ${img}, last name: ${id} ` + i)
            L.marker(coord,new LeafIcon({iconUrl: "https://fr.m.wikipedia.org/wiki/Fichier:Approve_icon.svg"})).addTo(map)
        }
        console.log("afficher")
    }

    async function getImage(nom){
        let URLId = 'https://api.genius.com/search?q='+nom+'&access_token=GeU8QghXpNWNaWVNgdew5wSrh8uAKlsGqfYNp0VFXNHcRVzAEzOVT8xuLCCdwI1R';
        let responseID = await fetch(URLId,{
            method: 'GET'
        })        
        let dataID = await responseID.json()
        id = dataID['response']['hits'][0]['result']['primary_artist']['id']
        console.log(id)
        
        let URLArtiste = 'https://api.genius.com/artists/'+id+'?access_token=GeU8QghXpNWNaWVNgdew5wSrh8uAKlsGqfYNp0VFXNHcRVzAEzOVT8xuLCCdwI1R';
        
        let responseArtiste = await fetch(URLArtiste,{
            method: 'GET'
        })        
        let dataArtiste = await responseArtiste.json()
        img = dataArtiste['response']['artist']['image_url']
        console.log(img)

    }




    // async function getIdArtiste(nom){
    //     var URLId = 'https://api.genius.com/search?q='+nom+'&access_token=GeU8QghXpNWNaWVNgdew5wSrh8uAKlsGqfYNp0VFXNHcRVzAEzOVT8xuLCCdwI1R';

    //     let response = await fetch(URLId,{
    //         method: 'GET'
    //     })
    //     let data = await response.json()
    //     id = data['response']['hits'][0]['result']['primary_artist']['id']
    // }

    // function getImage(nom){
    //     let URLId = 'https://api.genius.com/search?q='+nom+'&access_token=GeU8QghXpNWNaWVNgdew5wSrh8uAKlsGqfYNp0VFXNHcRVzAEzOVT8xuLCCdwI1R';
    //     fetch(URLId).then(function (response) {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             return Promise.reject(response);
    //         }
    //     }).then(function (data) {

    //         // Store the post data to a variable
    //         id = data['response']['hits'][0]['result']['primary_artist']['id'];
    //         console.log(id)
    //         let URLArtiste = 'https://api.genius.com/artists/'+id+'?access_token=GeU8QghXpNWNaWVNgdew5wSrh8uAKlsGqfYNp0VFXNHcRVzAEzOVT8xuLCCdwI1R';

    //         // Fetch another API
    //         return fetch(URLArtiste);

    //     }).then(function (response) {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             return Promise.reject(response);
    //         }
    //     }).then(function (artistdata) {
    //         img = artistdata['response']['artist']['image_url']
    //     }).catch(function (error) {
    //         console.warn(error);
    //     });
    //     return img
    // }
    


