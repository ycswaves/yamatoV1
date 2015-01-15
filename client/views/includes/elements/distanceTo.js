Template.distanceTo.helpers({
  getDistances: function(thisProperty){
    var multiAddress = Session.get('multiAddress')
      , distances = [];
    if(multiAddress){
      for(var key in multiAddress){
        var postcode = multiAddress[key].postcode
        if(postcode){
          var distCode = Config.getDistrictByPostal(postcode);
          if(distCode == thisProperty.district){ //if current property in the same district
            var geo = multiAddress[key].geometry;
            GoogleDirection.shortest(
              geo.latitude+','+geo.longitude, //from, can be addr or lat,lng
              thisProperty.map.latitude+','+thisProperty.map.longitude, //to
              'walk', //mode
              function(err, data){ //callback
                if(err){ // can be null when no result
                  console.log(err);
                } else {
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
          } else {
            console.log('not the same district');
          }
        } else {
          console.log('no postcode');
        }
      }
    }

    return distances;
  }
});
