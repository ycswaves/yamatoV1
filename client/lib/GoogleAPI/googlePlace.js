var nearbysearchURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

GooglePlace = {

  'getNearby' : function(lat, lng, types, callback){
    Meteor.call('googleMapAPI', nearbysearchURL, {
      params:{
        location : lat+','+lng,
        rankby : 'distance',
        types : types
      }
    },function(error,response){
      //if an error happened, error argument contains the details
      //if the request succeeded, the response will contain the response of the server request
      if (error) {
        console.log(error);
      }
      else {
        callback(error, response.data);
      }
    })
  }
}