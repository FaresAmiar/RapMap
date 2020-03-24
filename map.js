let map;
let json;
let id = 0;
let img;

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize:     [60, 60],
            iconAnchor:   [60, 60],
            popupAnchor:  [-30, -70]
        }
    });

    $(document).ready(function () {
        definirMap()
    });

    function definirMap() {

        map = L.map('map').setView([48.7945, 2.3340], 11);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: 'PING'}).addTo(map);

        $('#ajouterChanteur').click(ajouterChanteur());
    }
    async function fetchAsync () {
		await $.getJSON("./rapmap.json", (data) => json = data);
        await locatione(json);
    }

    function ajouterChanteur() {
        $.post({
            url : "base.php",
            data : $("#nomChanteur").val(),
            dataType : "text",
            success : () => {
                alert("Requête d'ajout de chanteur envoyée");
            }
        })
    }

    fetchAsync(); 
	
    // json.then((value) => { locatione(value)});

    async function locatione(json) {
        // for(var i = 0; i < json.length; ++i) {
        for(var i = 0; i < 10; ++i) {

            var coord = json[i]['location']['coordinates'];
            var coords = coord.split(',')
            coord = [coords[1].substring(1)]
            coord.push(coords[0])
            
            var artiste = {link : "", bio:"", twitter:"", facebook: "", instagram: ""};
            await getImage(json[i]['name'],artiste);
            await getBio(json[i]['name'],artiste);
            console.log(artiste)

            var icon = new LeafIcon({iconUrl: artiste.link})
            var marker = L.marker(coord,{icon: icon}).addTo(map)
            
            var popup = ""
            popup += "Nom : " + json[i]['name']
            popup += "<br>Ville : " + json[i]['location']['city']
            if(artiste.bio != "?") {
                popup += "<br>Biographie: " + artiste.bio
            }else{
                popup += "<br>Biographie: " + json[i]['bio']['summary']
            }
            if(artiste.twitter === "" || artiste.twitter === null) {
                popup += "<br>Twitter: "             
            }else{
                popup += "<br>Twitter: " + artiste.twitter            
            }
            if(artiste.facebook === "" || artiste.facebook === null) {
                popup += "<br>Facebook: "
            }else{
                popup += "<br>Facebook: " + artiste.facebook
            }
            if(artiste.instagram === "" || artiste.instagram === null) {
                popup += "<br>Instagram: " 
            }else{
                popup += "<br>Instagram: " + artiste.instagram
            }
            
            marker.bindPopup(popup).openPopup()
        }
        console.log("afficher")
    }

    async function getImage(nom,artiste){
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
        artiste.link = dataArtiste['response']['artist']['image_url']

    }

    async function getBio(nom,artiste){
        let URLId = 'https://api.genius.com/search?q='+nom+'&access_token=GeU8QghXpNWNaWVNgdew5wSrh8uAKlsGqfYNp0VFXNHcRVzAEzOVT8xuLCCdwI1R';
        let responseID = await fetch(URLId,{
            method: 'GET'
        })
        let dataID = await responseID.json()
        id = dataID['response']['hits'][0]['result']['primary_artist']['id']
        
        let URLArtiste = 'https://api.genius.com/artists/'+id+'?access_token=GeU8QghXpNWNaWVNgdew5wSrh8uAKlsGqfYNp0VFXNHcRVzAEzOVT8xuLCCdwI1R';
        
        let responseArtiste = await fetch(URLArtiste,{
            method: 'GET'
        })
        let dataArtiste = await responseArtiste.json()

        var bio = {bio: ""}
        biotxt(dataArtiste['response']['artist']['description']['dom']['children'], bio)
        artiste.bio = bio.bio

        artiste.facebook = dataArtiste['response']['artist']['facebook_name']
        artiste.instagram= dataArtiste['response']['artist']['instagram_name']
        artiste.twitter = dataArtiste['response']['artist']['twitter_name']
        artiste.link = dataArtiste['response']['artist']['image_url']

    }

    function biotxt (children, bio){
        for (let index = 0; index < children.length; index++) {
            if(children[index].children != undefined){
                biotxt(children[index].children,bio)
            }
            else if(children[index] === ""){
                bio.bio += "<br>"
            }
            else if(typeof(children[index]) === 'string'){
                bio.bio += children[index]
            }
            
        }
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
    


