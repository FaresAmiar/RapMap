var request1 = new XMLHttpRequest()
var id = 0
var bio = ""

function biotxt (children){
    for (let index = 0; index < children.length; index++) {
        if(children[index].children != undefined){
            biotxt(children[index].children)
        }
        else if(children[index] === ""){
            bio += "<br>"
        }
        else if(typeof(children[index]) === 'string'){
            bio += children[index]
        }
        
    }
}


request1.open('GET','https://api.genius.com/search?q=ninho&access_token=nOKS_slApPiXY3hr3wLrHBl_GPk9dl9KWuGmgM_HrZVwI8JQhKtatdSycRXq0wLN',false)

//request.setRequestHeader('Authorization','Bearer ')

request1.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
  
    if (request1.status >= 200 && request1.status < 400) {
        id = data['response']['hits'][0]['result']['primary_artist']['id']
        console.log(id)
    }
    else{
        console.log("error search")
    }
}

request1.send()

var request2 = new XMLHttpRequest
request2.open('GET','https://api.genius.com/artists/'+id+'?access_token=nOKS_slApPiXY3hr3wLrHBl_GPk9dl9KWuGmgM_HrZVwI8JQhKtatdSycRXq0wLN',false)
request2.onload = function(){
    var data = JSON.parse(this.response)
    if(request2.status >= 200 && request2.status < 400) {
        var img = data['response']['artist']['image_url']
        console.log(img)
        biotxt(data['response']['artist']['description']['dom']['children'])
            // var biotxt 
        // bio.forEach(element => {
        //     biotxt += element
        // });
        var facebook = data['response']['artist']['facebook_name']
        var instagram= data['response']['artist']['instagram_name']
        var twiter = data['response']['artist']['twitter_name']

        console.log(bio)
        console.log("facebook " + facebook)
        console.log("instagram " + instagram)
        console.log("twitter " + twiter)
    }
    else{
        console.log("error artists")
    }
}

request2.send()