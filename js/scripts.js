function Place(location, landmark, dateVisited, notes)  {
  this.location = location,
  this.landmark = landmark,
  this.dateVisited = dateVisited,
  this.notes = notes
}
Place.prototype.tripOverview = function() {
  return this.location + " " + this.landmark + " " + this.dateVisited + " " + this.notes;
}
function Passport() {
  this.places = [],
  this.currentId = 0
}
Passport.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places.push(place);
}
Passport.prototype.assignId = function()  {
  this.currentId += 1;
  return this.currentId;
}
Passport.prototype.findPlace = function(id) {
  for (let i=0; i< this.places.length; i++) {
    if (this.places[i].id == id)  {
      return this.places[i];
    }
  };
  return false;
}
Passport.prototype.deletePlace = function(id) {
  for (let i=0; i< this.places.length; i++) {
    if (this.places[i].id == id)  {
      this.places.splice(i, 1)
      return true;
    }
  };
  return false;
}

//1. Display properties when a user clicks the place's name.
//2. Add specs to README.md

let passport = new Passport();

function displayPlaceDetails(passportToDisplay) {
  let placesList = $("ul#places");
  let htmlForPlaceInfo = "";
  passportToDisplay.places.forEach(function(place)  {
    htmlForPlaceInfo += "<li id=" + place.id + ">" + place.location + ", " + place.landmark + "</li>"
  });
  placesList.html(htmlForPlaceInfo);
};
function showPlace(placeId) {
  const place = passport.findPlace(placeId);
  $("#show-place").toggle();
  $(".location").html(place.location);
  $(".landmark").html(place.landmark);
  $(".date-visited").html(place.dateVisited);
  $(".notes").html(place.notes);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + place.id + ">Delete</button>");
}
function attachContactListeners() {
  $("ul#places").on("click", "li", function () {
    showPlace(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    passport.deletePlace(this.id);
    $("#show-place").hide();
    displayPlaceDetails(passport);
  });
};
$(document).ready(function () {
  attachContactListeners();
  $("form#location").submit(function (event) {
    event.preventDefault();
    const inputtedLocation = $("input#new-location").val();
    const inputtedLandmark = $("input#new-landmark").val();
    const inputtedDateVisited = $("input#new-date-visited").val();
    const inputtedNotes = $("input#new-notes").val();

    $("input#new-location").val("");
    $("input#new-landmark").val("");
    $("input#new-date-visited").val("");
    $("input#new-notes").val("");

    let newPlace = new Place(inputtedLocation, inputtedLandmark, inputtedDateVisited, inputtedNotes);
    passport.addPlace(newPlace);
    displayPlaceDetails(passport);
  })
})