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

  $(".btn").on('click', function(event){
  	event.preventDefault();

var  = $("").val().trim();
var  = $("").val().trim();
var  = $("").val().trim();
var  = $("").val().trim();




database.ref().push(newTrain);




$("").val("");
$("").val("");
$("").val("");
$("").val("");

  });

  


 database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  	var = childSnapshot.val().
  	var  = childSnapshot.val()
  	var  = childSnapshot.val()
  	var  = childSnapshot.val().




$("# > tbody").append("<tr><td>" + xx + "</td><td>" + xx + "</td><td>" +
  xx + "</td><td>" + xx + "</td><td>" + xx + "</td></tr>");
});
