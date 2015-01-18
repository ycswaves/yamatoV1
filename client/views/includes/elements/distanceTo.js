Template.distanceTo.helpers({
  getDistances: function(thisProperty){
    var multiAddress = Session.get('multiAddress')
    , distances = [];

    if(multiAddress){
      for(var key in multiAddress){
        //var geo = multiAddress[key].geometry;
        //var address = multiAddress[key].address;

        var fromAddr = multiAddress[key].address //geo.latitude+','+geo.longitude
          , toAddr = thisProperty.address; //.map.latitude+','+thisProperty.map.longitude;

        GoogleDirection.shortest(fromAddr, toAddr, 'driving');
      }
    }

    return Directions.find({to:thisProperty.address});
  },
  hasMultiAddr: function(){
    var multiAddress = Session.get('multiAddress');
    return !$.isEmptyObject(multiAddress);
  }
});
