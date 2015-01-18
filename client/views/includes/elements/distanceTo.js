Template.distanceTo.helpers({
  getDistances: function(thisProperty){
    //使用ID做KEY来保存async返回的数据
    var _id = thisProperty._id;
    var multiAddress = Session.get('multiAddress')
    , determiner = [];
    if(multiAddress){
      var distances = [];
      for(var key in multiAddress){
        var geo = multiAddress[key].geometry;
        var address = multiAddress[key].address;
        var existSession = Session.get('gDirection.'+_id);
        var called = false;

        //避免重复调用相同地址
        _.each(existSession,function(s,key){
          if(s.from == address) {
            called = true;
            existSession[key].display = true;
          } else {
            // 取消显示，但是不擦除session，以便下次使用
            // existSession[key].display = false;
          }
        })

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
                  from: address,
                  to: thisProperty.address,
                  distance: data.distance/1000,
                  duration: Math.ceil(data.duration/60),
                  display:true
                };
                console.log('Call made:'+address);
                //存入之前已有的session
                if (existSession) {
                  existSession.push(obj)
                  Session.set('gDirection.'+_id,existSession);
                } else {
                  distances.push(obj);
                  Session.set('gDirection.'+_id,distances);
                }
              }
            });
        }
      }
    }
    return Session.get('gDirection.'+_id);
  },
  hasMultiAddr: function(){
    var multiAddress = Session.get('multiAddress');
    return !$.isEmptyObject(multiAddress);
  }
});
