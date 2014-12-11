var directionURL = "https://maps.googleapis.com/maps/api/directions/json";

GoogleDirection = {
  'to' : function(){
    Meteor.call('directionTo',directionURL,{
      query : {
        origin: "Hoboken NJ",
        destination: "Carroll Gardens, Brooklyn",
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
          departureTime: new Date()
        }
      }
    },function(error,response){
      console.log(response);
      //if an error happened, error argument contains the details
      //if the request succeeded, the response will contain the response of the server request
    })
  }
}