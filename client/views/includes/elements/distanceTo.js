Template.distanceTo.helpers({
  distances: function(thisProperty){
    console.log(thisProperty);
    var addresses = Session.get('multiAddress')
      , distances = [];
    if(addresses){
      for(var key in addresses){
        var postcode = multiAddress[key].postcode
        if(postcode){
          var distCode = Config.getDistrictByPostal(postcode);
          if(distCode == thisProperty.district){ //if current property in the same district
            var geo = multiAddress[key].geometry;
            GoogleDirection.shortest(
              geo.latitude+','+geo.longitude, //from, can be addr or lat,lng
              thisProperty.map.latitude+','+thisProperty.map.longitude, //to
              'transit', //mode
              function(data){ //callback
                if(data){ // can be null when no result
                  var obj = {
                    from: multiAddress[key].address,
                    to: thisProperty.address,
                    mode: '公共交通',
                    distance: data.distance,
                    duration: data.duration
                  };
                  distances.push(obj);
                }
              }
            );
          }
        }
      }
    }

    return distances;
  }
});
