// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// var bodyParser = require("body-parser");
var reservations = [];
var waitlist = [];
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// display all reservations
app.get("/api/reservations", function (req, res) {
  return res.json(reservations);
});

app.get("/api/waitlist", function (req, res) {
  return res.json(waitlist);
});

app.post("/api/reservations", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newreservation = req.body;
  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
  if (reservations.length >= 5) {
    waitlist.push(newreservation);
    console.log("You have been added to the waitlist.");
    console.log(waitlist);
  } else {
    console.log("Success! We have added your reservation.");
    console.log(newreservation);

    reservations.push(newreservation);

    res.json(newreservation);
  }

});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

// AJAX GET request to get reservations
$.ajax({
  url: "/api/waitlist",
  method: "GET"
}).then(function(response) {
  console.log(response);
});

// AJAX Post to push them to the api
$.ajax({
  url: 'api/reservations',
  dataType: 'json',
  type: 'post',
  contentType: 'application/json',
  //data: JSON.stringify( { "name": $('#name').val(), "email": $('#email').val() } ),
  
});

