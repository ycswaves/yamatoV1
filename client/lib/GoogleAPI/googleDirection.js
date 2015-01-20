/**
 * Directions
 * [{ referId: String,
 *   to: lat, lng,
 *   from: lat, lng,
 *   error: Boolean,
 *   response: Obj
 *   display: Boolean }]
 */
Directions = new Meteor.Collection(null);

var directionURL = "https://maps.googleapis.com/maps/api/directions/json";

GoogleDirection = {
  /**
   * 计算点到点的行程
   * @param  {[string]} from [坐标]
   * @param  {[string]} to   [坐标]
   * @param  {[string]} mode [driving,walking,bicyling,transit,默认driving]
   * @return {[object]}
   */
  'to' : function(from, to, mode, callback){
    var base_params = {
          origin : from,
          destination : to,
          mode : mode,
          alternatives : true,
          language: 'en'
        };

    if (mode == "transit") {
      base_params.departure_time = Math.floor(new Date().getTime()/1000); //一定需要
    }
    Meteor.call('get',directionURL,{params:base_params},
      function(error,response){
        //if an error happened, error argument contains the details
        //if the request succeeded, the response will contain the response of the server request
        if (error) {
          callback(null);
        }
        else {
          if (response.data.status == "OK") {
            if (mode == "transit") {
              $.each(response.data.routes, function(i, route){
                var routing = [];
                var steps = route.legs[0].steps;
                $.each(steps,function(o, step){
                  var hasIcon = true;
                  var bgColor = null;
                  var shortName = null;
                  if (step.travel_mode=="TRANSIT") {
                    if (typeof step.transit_details.line.color != "undefined") {
                      hasIcon = false;
                      bgColor = step.transit_details.line.color;
                    }
                    shortName = step.transit_details.line.short_name;
                  }
                  routing.push({
                    mode:step.travel_mode.toLowerCase(),
                    hasIcon:hasIcon, //需不需要显示图标
                    bgColor:bgColor,
                    shortName:shortName
                  });
                })
                response.data.routes[i].routing = routing;
              })
            }
            else {
              $.each(response.data.routes, function(i, route){
                response.data.routes[i].routing = [{mode:mode,hasIcon:true}];
              })
            }
            callback(response.data);
          }
          else {
            callback(null);
          }
        }
      }
    );
  },

  //from, to 均为坐标
  shortest : function(from, to, fromAddr, toAddr, mode) {
    var base_params = {
          origin : from,
          destination : to,
          mode : mode,
          language: 'en'
        };

    if (mode == "transit") {
      base_params.departure_time = Math.floor(new Date().getTime()/1000);//一定需要
    }

    var existed = Directions.findOne({from:from, to:to});
    if(existed && (existed.response || existed.error == '路线未找到')){
      //隐藏已有的数据，但不擦除
      Directions.update({toAddr: toAddr}, {$set:{display: true}},{multi:true});
    } else {
      var defaultRecord = {
        from:from,
        to:to,
        error: '路线查询中',
        response: null,
        display: true
      };
      Directions.insert(defaultRecord); //make a record first to prevent next repeated async call
      Meteor.call('get',directionURL,{params:base_params},
        function(error,response){
          console.log('call made!');
          if (error) {
            //meteor mongo does not support unique index yet, so here need to manually delete the default msg
            Directions.remove({from: from, to: to});
            //Directions.insert({from: from, to: to, error: error});
          }
          else {
            if (response.data.status == "OK") {
              var waiting = Directions.findOne(defaultRecord);
              if(waiting){
                //meteor mongo does not support unique index yet, so here need to manually delete the default msg
                Directions.remove({from: from, to: to});
                Directions.insert({from: from, to: to, fromAddr:fromAddr, toAddr:toAddr, error: null, response: response, display:true});

              }
            } else {
              console.log('err:',response);
              Directions.remove({from: from, to: to});
              Directions.insert({from: from, to: to, fromAddr:fromAddr, toAddr:toAddr, error: '路线未找到', response: null, display:true});
            }
          }
        }
      ); //end of meteor call
    }
  }
}