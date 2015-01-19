Template.distanceTo.helpers({
  getDistances: function(thisProperty){
    var multiAddress = Session.get('multiAddress')
    , distances = [];

    if(multiAddress){
      for(var key in multiAddress){
        var fromAddr = multiAddress[key].address //geo.latitude+','+geo.longitude
        , toAddr = thisProperty.address; //.map.latitude+','+thisProperty.map.longitude;

        GoogleDirection.shortest(fromAddr, toAddr, 'driving');
      }
    }
    return Directions.find({to:thisProperty.address});
  },
  duration: function(response){
    if (response) {
      var leg = response.data.routes[0].legs[0];
      return leg.duration.text;
    } else {
      return null;
    }
  },
  distance: function(response){
    if (response) {
      var leg = response.data.routes[0].legs[0];
      return leg.distance.text;
    } else {
      return null;
    }
  },
  hasMultiAddr: function(){
    var multiAddress = Session.get('multiAddress');
    return !$.isEmptyObject(multiAddress);
  }
});
