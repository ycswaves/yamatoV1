Template.distanceTo.helpers({
  getDistances: function(thisProperty){
    //使用ID做KEY来保存async返回的数据
    var _id = thisProperty._id;
    var multiAddress = Session.get('multiAddress')
    , determiner = [];
    if(multiAddress){
      for(var key in multiAddress){
        var geo = multiAddress[key].geometry;
        var address = multiAddress[key].address;
        var called = false;

        //避免重复调用相同地址
        if(directions.findOne({referId:_id,to:address})){
          called = true;
          directions.update({referId: _id,to:address}, {$set:{display: true}});
        }

        if (!called){
          GoogleDirection.shortest(
            thisProperty.map.latitude+','+thisProperty.map.longitude, //to
            geo.latitude+','+geo.longitude, //from, can be addr or lat,lng
            'driving', //mode
            function(err, data){ //callback
              if(err){ // can be null when no result
                console.log(err);
              } else {
                var obj = {
                  referId: _id,
                  from: thisProperty.address,
                  to: address,
                  distance: data.distance/1000,
                  duration: Math.ceil(data.duration/60),
                  display:true
                };
                console.log('Call made:'+address);
                //存入local collection
                if(directions.find(obj).count()==0){
                  directions.insert(obj);
                }
              }
            });
        }
      }
    }
    return directions.find({referId:_id,display:true});
  },
  hasMultiAddr: function(){
    var multiAddress = Session.get('multiAddress');
    return !$.isEmptyObject(multiAddress);
  }
});
