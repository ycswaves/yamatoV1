var nearbysearchURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

GooglePlace = {

  'getNearby' : function(lat, lng, types, callback){
    var base_params = {
          location: lat+','+lng,
          types: types,
          language: 'en'
        };
    if('subway_station' == types){
      base_params.rankby = 'distance';//not used in junction with radius!!!
    } else {
      base_params.radius = 1000;
    }
    Meteor.call('googleMapAPI', nearbysearchURL, {params: base_params},
      function(error,response){
      //if an error happened, error argument contains the details
      //if the request succeeded, the response will contain the response of the server request
      if (error) {
        callback(error, null);
      }
      else {
        callback(null, response.data);
      }
    })
  }
}