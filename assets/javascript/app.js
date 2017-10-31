// How-To: button prevent default
// $("myButton").click(function(event){
//     event.preventDefault();
// });

var animal = ""; var aniType = ""; var zipCode = ""; var breed = ""; var age = ""; var size = ""; var gender = ""; var dist = ""; var character = ""; var house = ""; 


$(document).ready(function() {

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

    var dogCounter = 0; var catCounter = 0; var horseCounter = 0; var smallfurryCounter = 0; var scalesCounter = 0; var barnyardCounter = 0; var birdCounter = 0;


         
    function databasePie(value){ //use this for entering the animal type into the DB with a counter
        
        if (value = "dog") {
            dogCounter++;
        }else if (value = "cat") {
            catCounter++;
        }else if (value = "horse") {
            horseCounter++;
        }else if (value = "smallfurry") {
            smallfurryCounter++;
        }else if (value = "reptile") {
            scalesCounter++;
        }else if (value = "barnyard") {
            barnyardCounter++;
        }else if (value = "bird") {
            birdCounter++;
        }else {
            console.log("no animal chosen");
        }

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
    
    //advanced, ver 2.0
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

        $(".distInput").click(function() {
            dist = $(this).html().trim();
            //dist.push(val);
            //console.log("distance: " + dist);
            $(".distInput").hide();
            $("#keepTrack").append(" " + dist + "-").removeClass("hidden");
        });

        $(".chrInput").click(function() {
            character = $(this).html().trim();
            //character.push(val);
            //console.log("characteristics: " + character);
            $(".chrInput").hide();
            $("#keepTrack").append(" " + character + "-").removeClass("hidden");
        });

        $(".houseInput").click(function() {
            house = $(this).html().trim();
            //house.push(val);
            //console.log("house has: " + house);
            $(".houseInput").hide();
            $("#keepTrack").append(" " + house + "-").removeClass("hidden");
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

            databasePie(animal);

            resetAll();
        });
           

        function callPie(){
            //use this to pull the DB and populate the piechart
        };

        function amazon(){
            //make a carosel, based on animal type? or just a randome pet carousel?
        }
});
// not in the document.ready!
//petfinder API function
function callPets(animal, location){
    var url = "http://api.petfinder.com/pet.find?format=json&key=0dbe85d873e32df55a5a7be564ae63a6&callback=?&animal="+animal+"&location="+location+"&count=10";
    $.ajax({
    url: url,
    dataType: 'jsonp',
    method: 'GET',
    }).done(function(result) {

        for(var i = 0; i < result.petfinder.pets.pet.length; i++){
            $("table").append("<tr class='showData' id='"+i+"'><td colspan=2><img src='"+result.petfinder.pets.pet[i].media.photos.photo[2].$t+"'/ ></td><td>"+result.petfinder.pets.pet[i].name.$t+"</td></tr><tr class='hideData' data='hidden' id='a"+i+"'><td>"+result.petfinder.pets.pet[i].description.$t+"</td></tr>");

            if(result.petfinder.pets.pet[i].breeds.breed[1] === undefined){
                 $("#"+i).append("<td>"+result.petfinder.pets.pet[i].breeds.breed.$t+"</td></tr>");
            }
            else{
                 $("#"+i).append("<td>"+result.petfinder.pets.pet[i].breeds.breed[0].$t+" & "+result.petfinder.pets.pet[i].breeds.breed[1].$t+"</td>");
            }
        }

    });
};

callPets("dog", 60640);

$(document).on("click", ".showData", function(){
    if($("#a"+$(this).attr("id")).attr('data') === "hidden"){
        $("#a"+$(this).attr("id")).show();
        $("#a"+$(this).attr("id")).attr('data', "showing");
    } else{
        $("#a"+$(this).attr("id")).hide();
        $("#a"+$(this).attr("id")).attr('data', "hidden");
    }
});