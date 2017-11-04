// How-To: button prevent default
// $("myButton").click(function(event){
//     event.preventDefault();
// });

var animal = ""; var aniType = ""; var zipCode = ""; var breed = ""; var age = ""; var size = ""; var gender = ""; var dist = ""; var character = ""; var house = ""; 
 var dogCounter = 0; var catCounter = 0; var horseCounter = 0; var smallfurryCounter = 0; var scalesCounter = 0; var barnyardCounter = 0; var birdCounter = 0;

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
});

// Random Animal Generator API
function randomPet(){

    // Array for choosing random animal for displaying random animal 
    // from a random location within US
    var randomAnimalArray = ["dog","cat","horse","bird","barnyard"];

    // variable for storing the random randomly selected animal from the array
    randomSearch = randomAnimalArray[Math.floor(Math.random() * (5 - 0)) + 0]; 
    
    // Array to store the random Zip codes of 100 places within US. Since random select API
    // did not work we had to hard code these
    var randomZipArray = [61704,53072,11724,11725,11726,11727,11729,11730,11731,11732,
                          11733,11735,11737,11738,11739,11740,11741,11742,11743,11746,
                          11747,11749,11751,11752,11753,11755,11756,11757,11758,11760,
                          11762,11763,11764,11765,11766,11767,11768,11769,11770,11771,
                          11772,11773,11775,11776,11777,33428,33429,33430,33431,33432,
                          33433,33434,33435,33436,33437,33576,33578,33579,33583,33584,
                          33585,33731,33732,33733,33734,33736,33737,33738,35013,35014,
                          35015,35016,35019,35020,35021,35022,35023,35212,35213,35214,
                          35215,35216,35217,35218,35219,35220,35221,40588,40591,40598,
                          40601,40602,40603,40604,40618,40619,41074,41075,41076,41080];
    
    // Storing randomly selected zip onto the variable
    var randomZip = randomZipArray[Math.floor(Math.random() * (100 - 0)) + 0];
    

    // Passing the variables into the url for API call
    var url = "http://api.petfinder.com/pet.find?format=json&key=0dbe85d873e32df55a5a7be564ae63a6&callback=?&animal="+randomSearch+"&location="+randomZip+"&count=5";
    
    // API call to get the data to show the random animal picture
    $.ajax({
    url: url,
    dataType: 'jsonp',
    method: 'GET',
    }).done(function(result) {
        
        // Rendering the images of two randomly selected animals 
        $(".randomImage").append('<tr><td>'+"<img src="+result.petfinder.pets.pet[0].media.photos.photo[1].$t+"/ >"+
            '</td><td>'+ result.petfinder.pets.pet[0].name.$t+'</td><td>'+"<img src="+result.petfinder.pets.pet[1].media.photos.photo[1].$t+"/ >"+
            '</td><td>'+ result.petfinder.pets.pet[1].name.$t+'</td></tr>');

});
}


// Finding shelter's Latitudnal and Logitudnal positions
function shelterFind(id){
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
           console.log(result);
           console.log(latitude);
           console.log(longitude);

       });

}

// not in the document.ready!
//petfinder API function
function callPets(animal, location){
    var url = "http://api.petfinder.com/pet.find?format=json&key=0dbe85d873e32df55a5a7be564ae63a6&callback=?&animal="+animal+"&location="+location+"&count=10";
    $.ajax({
    url: url,
    dataType: 'jsonp',
    method: 'GET',
    }).done(function(result) {
           //console.log(result);

        for(var i = 0; i < result.petfinder.pets.pet.length; i++){
            $("table").append("<tr class='showData' id='"+i+"'><td colspan=2><img src='"+result.petfinder.pets.pet[i].media.photos.photo[2].$t+"'/ ></td><td>"+result.petfinder.pets.pet[i].name.$t+"</td></tr><tr class='hideData' data='hidden' id='a"+i+"'><td>"+result.petfinder.pets.pet[i].description.$t+"</td></tr>");
            
            // Getting the shelterId captured in an array
            // If shelterId is not there in API data then store Null in the array
            if(result.petfinder.pets.pet[i].shelterId === undefined)
                shelterId = null;
            else{
                shelterId = result.petfinder.pets.pet[i].shelterId.$t;
                shelterFind(shelterId);

            }

            if(result.petfinder.pets.pet[i].breeds.breed[1] === undefined){
                 $("#"+i).append("<td>"+result.petfinder.pets.pet[i].breeds.breed.$t+"</td></tr>");
            }
            else{
                 $("#"+i).append("<td>"+result.petfinder.pets.pet[i].breeds.breed[0].$t+" & "+result.petfinder.pets.pet[i].breeds.breed[1].$t+"</td>");
            }
        }

    });
};

callPets("dog", 61704);
randomPet();

$(document).on("click", ".showData", function(){
    if($("#a"+$(this).attr("id")).attr('data') === "hidden"){
        $("#a"+$(this).attr("id")).show();
        $("#a"+$(this).attr("id")).attr('data', "showing");
    } else{
        $("#a"+$(this).attr("id")).hide();
        $("#a"+$(this).attr("id")).attr('data', "hidden");
    }

});



 

