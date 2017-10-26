// How-To: button prevent default
// $("myButton").click(function(event){
//     event.preventDefault();
// });

var animal = ""; var zipCode = ""; var breed = ""; var age = []; var size = []; var gender = []; var dist = []; var character = []; var house = []; 

$(document).ready(function() {

    //set the Adv Inputs to be slid up
    function startSlidUp() {
        $("#hider").slideToggle("slow");
    }

    startSlidUp();
    
    //function to swap advanced features on/off v 2.0
    $("#searchBoxAdv").click(function() {
        $("#hider").slideDown("slow");
    });

    $("#resetBtn").click(function(event){
        event.preventDefault();
        var animal = ""; var zipCode = ""; var breed = ""; var age = []; var size = []; var gender = []; var dist = []; var character = []; var house = []; 
        $("#aniType").val("");
    });

    $(".ageInput").click(function() {
        var val = $(this).html().trim();
        age.push(val);
        console.log("age: " + age);
    });

    $(".szInput").click(function() {
        var val = $(this).html().trim();
        size.push(val);
        console.log("size: " + size);
    });

    $(".genInput").click(function() {
        var val = $(this).html().trim();
        gender.push(val);
        console.log("gender: " + gender);
    });

    $(".distInput").click(function() {
        var val = $(this).html().trim();
        dist.push(val);
        console.log("distance: " + dist);
    });

    $(".chrInput").click(function() {
        var val = $(this).html().trim();
        character.push(val);
        console.log("characteristics: " + character);
    });

    $(".houseInput").click(function() {
        var val = $(this).html().trim();
        house.push(val);
        console.log("house has: " + house);
    });

    $("#searchBtn").click(function(event){
        event.preventDefault();

        $("#results").removeClass("hidden");

        animal = $("#aniType").val().trim();
        console.log("type: " + animal);
        zipCode = $("#zipCode").val().trim();
        console.log("zip: " + zipCode);
        breed = $("#aniBreed").val().trim();
        console.log("breed: " + breed);
    });

});

//petfinder API function
function callPets(animal, location, breed, size, sex, age,){
    var url = "http://api.petfinder.com/pet.find?format=json&key=0dbe85d873e32df55a5a7be564ae63a6&callback=?&animal="+animal+"&location="+location;
    $.ajax({
    url: url,
    dataType: 'jsonp',
    method: 'GET',
    }).done(function(result) {

        for(var i = 0; i < result.petfinder.pets.pet.length; i++){
            $("body").append("<div id="+i+"><img src='"+result.petfinder.pets.pet[i].media.photos.photo[2].$t+"'/ ></div");
            $("#"+i).append(result.petfinder.pets.pet[i].shelterId.$t);
        }

    });
};