// How-To: button prevent default
// $("myButton").click(function(event){
//     event.preventDefault();
// });

var animal = ""; var aniType = ""; var zipCode = ""; var breed = ""; var age = ""; var size = ""; var gender = ""; var dist = ""; var character = ""; var house = ""; 
 var dogCounter = 0; var catCounter = 0; var horseCounter = 0; var smallfurryCounter = 0; var scalesCounter = 0; var barnyardCounter = 0; var birdCounter = 0;

var map = {};
var googleMap;

$(document).ready(function() {

    setTimeout(initMap, 1000);

    //set the Adv Inputs to be slid up
    function startHidden() {
        $("#hider").hide();
    }

    startHidden();

    var config = {
        apiKey: "AIzaSyAyQONpbGnmz5P9HxgnYJ4ZBjz6tcCx-NA",
        authDomain: "petfinder2-2538c.firebaseapp.com",
        databaseURL: "https://petfinder2-2538c.firebaseio.com",
        projectId: "petfinder2-2538c",
        storageBucket: "petfinder2-2538c.appspot.com",
        messagingSenderId: "444753129835"
    };

    firebase.initializeApp(config);

    var database = firebase.database();



         
    function databasePie(value){ //use this for entering the animal type into the DB with a counter
        // counter++ functionality
        if (value === "dog") {
            console.log("database entry: " + value);
            dogCounter++;
        }else if (value === "cat") {
            console.log("database entry: " + value);
            catCounter++;
        }else if (value === "horse") {
            console.log("database entry: " + value);
            horseCounter++;
        }else if (value === "smallfurry") {
            console.log("database entry: " + value);
            smallfurryCounter++;
        }else if (value === "reptile") {
            console.log("database entry: " + value);
            scalesCounter++;
        }else if (value === "barnyard") {
            console.log("database entry: " + value);
            barnyardCounter++;
        }else if (value === "bird") {
            console.log("database entry: " + value);
            birdCounter++;
        }else {
            console.log("no animal chosen");
        }

        //add counter to the DB
        database.ref().set({
            dogs: dogCounter,
            cats: catCounter,
            horse: horseCounter,
            smallfurry: smallfurryCounter,
            scales: scalesCounter,
            barnyard: barnyardCounter,
            bird: birdCounter
            
        });
    };

    //pull the DB values   
    database.ref().on("value", function(snapshot) {
        dogCounter = snapshot.val().dogs;
        catCounter = snapshot.val().cats;
        horseCounter = snapshot.val().horse;
        smallfurryCounter = snapshot.val().smallfurry;
        scalesCounter = snapshot.val().scales;
        barnyardCounter = snapshot.val().barnyard;
        birdCounter = snapshot.val().bird;

        //using chartjs, populate the pie chart with DB info
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Most Popular Pets Searched"
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##",
                indexLabel: "{label} {y}",
                dataPoints: [
                    {y: dogCounter, label: "Dog"},
                    {y: catCounter, label: "Cat"},
                    {y: horseCounter, label: "Horses"},
                    {y: smallfurryCounter, label: "Small and Furry"},
                    {y: scalesCounter, label: "Reptiles"},
                    {y: birdCounter, label: "Birds"},
                    {y: barnyardCounter, label: "Barnyard"}
                    
                ]
            }]

        });

        chart.render();

    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
    
    //advanced items seaercher, ver 2.0
    $('#searchBoxAdv').click(function () {
        $("#hider").show(800, "swing");
    });

    function resetAll() {
        //reset global variables and animal type
        animal = ""; zipCode = ""; breed = ""; age = ""; size = ""; gender = ""; dist = ""; character = ""; house = ""; 
        $("#aniType").val("");
        //re-show all Adv Btns
        $(".btnMatch").show();
        //reset Keep track
        $("#keepTrack").html("<p id='keepTrack'>Keep track:</p>");
        //reset results
        $("#resultsTable").html("");
        //reset dropdown name
        $(".typeBtn").html("Type <span class='caret'></span>");
        //reset zip code
        $("#zipCode").val("");
       //reset breed type 
        $("#aniBreed").val("");
    };

    $("#resetBtn").click(function(event) {
        event.preventDefault();
        resetAll();
    });

    //Build the arrays for each individual advanced feature:
        //Each follows this formula -
        //get the click based on class
        //pull the data or the html needed to build the array to a variable
        //push that info into the global array
        //hide the button
        //set keep track of what you clicked    

        $(".ageInput").click(function() {
            age = $(this).html().trim();
            //age.push(val);
            //console.log("age: " + age);
            $(".ageInput").hide();
            $("#keepTrack").append(" " + age + "-").removeClass("hidden");
        });

        $(".szInput").click(function() {
            size = $(this).attr("data");
            //size.push(val);
            //console.log("size: " + size);
            $(".szInput").hide();
            $("#keepTrack").append(" " + size + "-").removeClass("hidden");
        });

        $(".genInput").click(function() {
            gender = $(this).attr("data");
            //gender.push(val);
            //console.log("gender: " + gender);
            $(".genInput").hide();
            $("#keepTrack").append(" " + gender + "-").removeClass("hidden");
        });

    //Dropdown getter
        $(".dropSel").click(function(event){
            event.preventDefault();
            //pull the data from the dropdown list
            aniType = $(this).attr("data");
            //pull the text from the dropdown to rename the dropdown
            var renameBtn = $(this).text();
            //rename the dropdown
            $(".typeBtn").html(renameBtn + " <span class='caret'></span>");
        });

    //Search button
        $("#searchBtn").click(function(event){
            event.preventDefault();

            $("#results").removeClass("hidden");

            animal = aniType;
            console.log("type: " + animal);
            zipCode = $("#zipCode").val().trim();
            console.log("zip: " + zipCode);
            breed = $("#aniBreed").val().trim();
            console.log("breed: " + breed);

            callPets(animal,zipCode, breed)

            databasePie(animal);

            resetAll();
        });
});

// Random Animal Generator API
// Random Animal Generator API
function randomPet(){

    // Array for choosing random animal for displaying random animal 
    // from a random location within US
    var randomAnimalArray = ["dog","cat","horse","bird","barnyard"];

    // variable for storing the random randomly selected animal from the array
    randomSearch = randomAnimalArray[Math.floor(Math.random() * (5 - 0)) + 0]; 

    // Passing the variables into the url for API call
    var url = "http://api.petfinder.com/pet.getRandom?format=json&key=0dbe85d873e32df55a5a7be564ae63a6&callback=?&animal="+randomSearch+"&output=basic";
    
    // API call to get the data to show the random animal picture and information using 
    //pet.getRandom method
    $.ajax({
    url: url,
    dataType: 'jsonp',   
    method: 'pet.getRandom',
    }).done(function(result) {
        
        
        // Rendering the images of two randomly selected animals 
        $(".randomImage").append('<tr><td>'+"<img src="+result.petfinder.pet.media.photos.photo[1].$t+"/>"+
            '</td><td>'+result.petfinder.pet.name.$t+
            '</td><td>'+result.petfinder.pet.age.$t+
            '</td><td>'+result.petfinder.pet.animal.$t+
            '</td><td> from '+result.petfinder.pet.contact.city.$t+
            '</td><td>, '+result.petfinder.pet.contact.state.$t+'</td></tr>');

});
}


// Finding shelter's Latitudnal and Logitudnal positions
function shelterFind(id, number){
    var longitude = "";
    var latitude = "";
    var url = "http://api.petfinder.com/shelter.get?format=json&key=0dbe85d873e32df55a5a7be564ae63a6&callback=?&id="+id;
    $.ajax({
    url: url,
    dataType: 'jsonp',
    method: 'shelter.get',
    }).done(function(result) {
        latitude = result.petfinder.shelter.latitude.$t;
        longitude = result.petfinder.shelter.longitude.$t;
         // Coordinates to center the map
            var myLatlng = new google.maps.LatLng(latitude,longitude);
            var myCenter = new google.maps.LatLng(parseFloat(latitude)+.9,longitude-.9);
 
            // Other options for the map, pretty much selfexplanatory
            var mapOptions = {
                zoom: 8,
                center: myCenter,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var bounds  = new google.maps.LatLngBounds();

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: result.petfinder.shelter.name.$t
            });

            // Attach a map to the DOM Element, with the defined settings
            map = new google.maps.Map(document.getElementById("map"+number), mapOptions);
           console.log(result.petfinder.shelter);
       });

}

//petfinder API function
function callPets(animal, location, breed){
    var url = "http://api.petfinder.com/pet.find?format=json&key=0dbe85d873e32df55a5a7be564ae63a6&callback=?&animal="+animal+"&location="+location+"&breed="+breed+"&size="+size+"&sex="+gender+"&age="+age+"&count=10";
    $.ajax({
    url: url,
    dataType: 'jsonp',
    method: 'GET',
    }).done(function(result) {
           //console.log(result);

        for(var i = 0; i < result.petfinder.pets.pet.length; i++){
           
            // Getting the shelterId captured in an array
            // If shelterId is not there in API data then store Null in the array
            if(result.petfinder.pets.pet[i].shelterId === undefined){
                shelterId = null;
            }
            else{
                shelterId = result.petfinder.pets.pet[i].shelterId.$t;
            }

            var tempBreed;
            if(result.petfinder.pets.pet[i].breeds.breed[1] === undefined){
                tempBreed = result.petfinder.pets.pet[i].breeds.breed.$t;
                //$("#"+i).append(result.petfinder.pets.pet[i].breeds.breed.$t);
            }
            else{
                tempBreed = result.petfinder.pets.pet[i].breeds.breed[0].$t+" & "+result.petfinder.pets.pet[i].breeds.breed[1].$t;
                 //$("#"+i).append(result.petfinder.pets.pet[i].breeds.breed[0].$t+" & "+result.petfinder.pets.pet[i].breeds.breed[1].$t);
            }
            
            $("#resultsTable").append("<div class='showData row' id='"+i+"'><div class='col-md-4'><img src='"+result.petfinder.pets.pet[i].media.photos.photo[2].$t+"'/ ></div><div class='col-md-4 text'>"+result.petfinder.pets.pet[i].name.$t+"</div><div class='col-md-4 text'>"+tempBreed+"</div></div><div class='hideData row' data='hidden' id='a"+i+"'><div class='col-md-6'>"+result.petfinder.pets.pet[i].description.$t+"</div><div class='col-md-6'><div class='row map' id='map"+i+"'></div></div>");
             shelterFind(shelterId, i);

        }

    });
};



    function initMap(latitude, longitude) {
        map = {
            center: {lat: 40, lng: -80},
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        google.maps.event.addListener(map, "idle", function(){
            google.maps.event.trigger(map, 'resize'); 
        });
    };

randomPet();

$(document).on("click", ".showData", function(){

    if($("#a"+$(this).attr("id")).attr('data') === "hidden"){
        var upd = setInterval(function(){
            window.dispatchEvent(new Event('resize'));
            clearInterval(upd)
        }, 500)
        $(".hideData").hide();
        $(".hideData").attr('data', 'hidden');
        $("#a"+$(this).attr("id")).show();
        $("#a"+$(this).attr("id")).attr('data', "showing");
    } else{
        $("#a"+$(this).attr("id")).hide();
        $("#a"+$(this).attr("id")).attr('data', "hidden");
    }

});