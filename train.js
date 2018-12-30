
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

    // Capture Button Click
    $("#add-user").on("click", function(event) {
      // event.preventDefault();

      // Grabbed values from text-boxes
     var  trainName = $("#name-input").val().trim();
     var destination = $("#destination-input").val().trim();
     var  trainTime = $("#time-input").val().trim();
     var  frequencyMinutes = $("#minute-input").val().trim();

      // Code for "Setting values in the database"
      database.ref().push({
         train:trainName,
         dest: destination,
         time:trainTime,
        freq: frequencyMinutes
      });

        alert("Train added successfully, Thank You ! ");
            $("#name-input").val().trim();
            $("#destination-input").val().trim();
             $("#time-input").val().trim();
               $("#minute-input").val().trim();
    });

     database.ref().on("child_added", function(childSnapshot) { 
      // Store everything into a variable.
      var tName = childSnapshot.val().train;
      var tDestination = childSnapshot.val().dest;
      var fisrtTrainTime = childSnapshot.val().time;
      var tFrequencyMinutes = childSnapshot.val().freq;
    
      var timeArr = fisrtTrainTime.split(":");
      var timeOfFirstTrain = moment().hours(timeArr[0]).minutes(timeArr[1]);
      var maxMoment = moment.max(moment(), timeOfFirstTrain);
      var trainsMinutes;
      var trainsArrival;
    
      // If the first train is later than the current time, sent arrival to the first train time
      if (maxMoment === timeOfFirstTrain) {
        trainsArrival = timeOfFirstTrain.format("hh:mm A");
        trainsMinutes = timeOfFirstTrain.diff(moment(), "minutes");
      } else {
    
        // Calculate the minutes until arrival using hardcore math
        // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
        // and find the modulus between the difference and the frequency.
        var differenceTimes = moment().diff(timeOfFirstTrain, "minutes");
        var tRemainder = differenceTimes % tFrequencyMinutes;
        trainsMinutes = tFrequencyMinutes - tRemainder;
        // To calculate the arrival time, add the tMinutes to the current time
        trainsArrival = moment().add(trainsMinutes, "m").format("hh:mm A");
      }
        // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(tName),
    $("<td>").text(tDestination),
    $("<td>").text("Every" + " " + tFrequencyMinutes + " " + "minutes"),
    $("<td>").text(trainsArrival),
    $("<td>").text(trainsMinutes)
    
    // $("<td>").text(empRate),
    // $("<td>").text(empBilled)
  );

  $(".table > tbody").append(newRow);
  });

     

   
