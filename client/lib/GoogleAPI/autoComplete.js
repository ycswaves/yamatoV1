GoogleAutoComplete = function(){
  this.autocomplete = {},
  this.init = function(divID, callback){
    var self = this;
    // Create the autocomplete object, restricting the search
    // to geographical location types.
    var options = {
      // types: ['establishment']
      // language: 'en'
    };

    self.autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */
        (document.getElementById(divID)),
        options
    );
    // When the user selects an address from the dropdown,
    // populate the address fields in the form.
    google.maps.event.addListener(self.autocomplete, 'place_changed', function() {
      //console.log(this);
      callback(self.autocomplete.getPlace());
    });
  },

  // Bias the autocomplete object to the user's geographical location,
  // as supplied by the browser's 'navigator.geolocation' object.
  this.geolocate = function(){
    if (navigator.geolocation) {
      var self = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = new google.maps.LatLng(
            position.coords.latitude, position.coords.longitude);
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        self.autocomplete.setBounds(circle.getBounds());
      });
    }
  }
}