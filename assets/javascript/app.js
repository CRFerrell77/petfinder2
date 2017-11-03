// How-To: button prevent default
// $("myButton").click(function(event){
//     event.preventDefault();
// });

var animal = ""; var aniType = ""; var zipCode = ""; var breed = ""; var age = []; var size = []; var gender = []; var dist = []; var character = []; var house = []; 

$(document).ready(function() {

    //set the Adv Inputs to be slid up
    function startHidden() {
        $("#hider").hide();
    }

    startHidden();
    
    //advanced, ver 2.0
    $('#searchBoxAdv').click(function () {
        $("#hider").show(800, "swing");
    });

    $("#resetBtn").click(function(event){
        event.preventDefault();
        //reset global variables and animal type
        animal = ""; zipCode = ""; breed = ""; age = []; size = []; gender = []; dist = []; character = []; house = []; 
        $("#aniType").val("");
        //re-show all Adv Btns
        $(".btnMatch").show();
        //reset Keep track
        $("#keepTrack").html("<p id='keepTrack'>Keep track:</p>");
    });

    //Build the arrays for each individual advanced feature:
        //Each follows this formula -
        //get the click based on class
        //pull the data or the html needed to build the array to a variable
        //push that info into the global array
        //hide the button
        //set keep track of what you clicked    

        $(".ageInput").click(function() {
            var val = $(this).html().trim();
            age.push(val);
            console.log("age: " + age);
            $(this).hide();
            $("#keepTrack").append(" " + val + "-").removeClass("hidden");
        });

        $(".szInput").click(function() {
            var val = $(this).attr("data");
            size.push(val);
            console.log("size: " + size);
            $(this).hide();
            $("#keepTrack").append(" " + val + "-").removeClass("hidden");
        });

        $(".genInput").click(function() {
            var val = $(this).attr("data");
            gender.push(val);
            console.log("gender: " + gender);
            $(this).hide();
            $("#keepTrack").append(" " + val + "-").removeClass("hidden");
        });

        $(".distInput").click(function() {
            var val = $(this).html().trim();
            dist.push(val);
            console.log("distance: " + dist);
            $(this).hide();
            $("#keepTrack").append(" " + val + "-").removeClass("hidden");
        });

        $(".chrInput").click(function() {
            var val = $(this).html().trim();
            character.push(val);
            console.log("characteristics: " + character);
            $(this).hide();
            $("#keepTrack").append(" " + val + "-").removeClass("hidden");
        });

        $(".houseInput").click(function() {
            var val = $(this).html().trim();
            house.push(val);
            console.log("house has: " + house);
            $(this).hide();
            $("#keepTrack").append(" " + val + "-").removeClass("hidden");
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

            $("table").html("");

            $("#results").removeClass("hidden");

            animal = aniType;
            console.log("type: " + animal);
            zipCode = $("#zipCode").val().trim();
            console.log("zip: " + zipCode);
            breed = $("#aniBreed").val().trim();
            console.log("breed: " + breed);

            //databasePie(animal);

            callPets(animal, zipCode, breed, age[0]);
        });


    //petfinder API function
    function callPets(animal, location, breed, age){
        var url = "http://api.petfinder.com/pet.find?format=json&key=0dbe85d873e32df55a5a7be564ae63a6&callback=?&animal="+animal+"&location="+location+"&breed="+breed+"&count=10";
        $.ajax({
        url: url,
        dataType: 'jsonp',
        method: 'GET',
        }).done(function(result) {

            for(var i = 0; i < result.petfinder.pets.pet.length; i++){
                    var tempBreed;
                if(result.petfinder.pets.pet[i].breeds.breed[1] === undefined){
                    tempBreed = result.petfinder.pets.pet[i].breeds.breed.$t;
                    //$("#"+i).append(result.petfinder.pets.pet[i].breeds.breed.$t);
                }
                else{
                    tempBreed = result.petfinder.pets.pet[i].breeds.breed[0].$t+" & "+result.petfinder.pets.pet[i].breeds.breed[1].$t;
                    //$("#"+i).append(result.petfinder.pets.pet[i].breeds.breed[0].$t+" & "+result.petfinder.pets.pet[i].breeds.breed[1].$t);
                }

                $("#resultsTable").append("<div class='showData row' id='"+i+"'><div class='col-md-4'><img src='"+result.petfinder.pets.pet[i].media.photos.photo[2].$t+"'/ ></div><div class='col-md-4'>"+result.petfinder.pets.pet[i].name.$t+"</div><div class='col-md-4'>"+tempBreed+"</div></div><div class='hideData row' data='hidden' id='a"+i+"'><div class='col-md-6'>"+result.petfinder.pets.pet[i].description.$t+"</div><div class='col-md-6'><div class='row' id='map'></div></div>");
            }            
        });
    };

    var map;
    function initMap(latitude, longitude) {
                map = new google.maps.Map(document.getElementById("map"), {
                center: {lat: latitude, lng: longitude},
                zoom: 8
                });
            };

    $(document).on("click", ".showData", function(){
         $(".hideData").hide();
        if($("#a"+$(this).attr("id")).attr('data') === "hidden"){
            $("#a"+$(this).attr("id")).show();
            $("#a"+$(this).attr("id")).attr('data', "showing");
            
            initMap(41.881832,-87.623177);
        } else{
            $("#a"+$(this).attr("id")).hide();
            $("#a"+$(this).attr("id")).attr('data', "hidden");
        }
    });
});