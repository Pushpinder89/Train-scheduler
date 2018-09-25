  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDYozsicEZy2CLjVdkqRVIXmXS9iTYh8eE",
    authDomain: "train-scheduler-761.firebaseapp.com",
    databaseURL: "https://train-scheduler-761.firebaseio.com",
    projectId: "train-scheduler-761",
    storageBucket: "",
    messagingSenderId: "681170369035"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

    // Initial Values
    var trainName = "";
    var destination = "";
    var trainTime = 0;
    var frequencyMinutes = "";
    var minutesAway = "";

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text-boxes
      trainName = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      trainTime = $("#time-input").val().trim();
      frequencyMinutes = $("#minute-input").val().trim();

      // Code for "Setting values in the database"
      database.ref().set({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequencyMinutes: frequencyMinutes
      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // Log everything that's coming out of snapshot
      console.log(snapshot.val());
      console.log(snapshot.val().trainName);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().trainTime);
      console.log(snapshot.val().frequencyMinutes);

      // Change the HTML to reflect
      $("#trainName-display").text(snapshot.val().trainName);
      $("#destination-display").text(snapshot.val().destination);
      $("#frequency-display").text(snapshot.val().trainTime);
      $("#nextArrival-display").text(snapshot.val().frequencyMinutes);
     // $("#minutesAway-display").text(snapshot.val().comment);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

