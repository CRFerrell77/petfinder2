
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


//
    var dogCounter = 0;
    var catCounter = 0;
    var horseCounter = 0;
    var smallfurryCounter = 0;
    var scalesCounter = 0;
    var barnyardCounter = 0;
    var birdCounter = 0;
  
     
  function databasePie(){


if ( = "dog") {
  dogCounter++;
}else if (userPick = "cat") {
  catCounter++;
}else if (userPick = "horse") {
  horsCounter++;
}else if (userPick = "small-furry") {
  smallfurryCounter++;
}else if (userPick = "scales") {
  scalesCounter++;
}else if (userPick = "barnyard") {
  barnyardCounter++;
}else if (userPick = "bird") {
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
}

     function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  