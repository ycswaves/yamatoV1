Template.distanceTo.helpers({
  getDistances: function(thisProperty){
    var multiAddress = Session.get('multiAddress')
    , distances = [];

    if(multiAddress){
      for(var key in multiAddress){
        var from = thisProperty.map.latitude+","+thisProperty.map.longitude //.map.latitude+','+thisProperty.map.longitude;
        ,to = multiAddress[key].geometry.latitude+","+multiAddress[key].geometry.longitude; //geo.latitude+','+geo.longitude
        
        var fromAddr = thisProperty.address //property address
        ,toAddr = multiAddress[key].address; //destination address

        GoogleDirection.shortest(from, to, fromAddr, toAddr, 'driving');
      }
    }
    return Directions.find({fromAddr:thisProperty.address});
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
