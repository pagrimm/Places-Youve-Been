function Place(location, landmark, dateVisited, notes)  {
  this.location = location,
  this.landmark = landmark,
  this.dateVisited = dateVisited,
  this.notes = notes
}

function Passport() {
  this.places = [],
  this.currentId = 0
}
Passport.prototype.addPlace = function(place) {
  place.id = this.assigndId();
  this.places.push(place);
}
Passport.prototype.assignId = function()  {
  this.currentId += 1;
  return this.currentId;
}
Passport.prototype.findPlace = function(id) {
  for (let i=0; i< this.places.length; i++) {
    if (this.places[i])  {
      if (this.places[i].id == id)  {
        return this.places[i];
      }
    }
  };
  return false;
}



//1. Display properties when a user clicks the place's name.
//2. Add specs to README.md
$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    const newPlace = $("input#new-first-name").val();
    const newPlaceLandmark = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();

    // The next three lines are new:
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})