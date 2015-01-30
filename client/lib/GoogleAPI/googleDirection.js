/**
 * Directions
 * [{ referId: String,
 *   to: lat, lng,
 *   from: lat, lng,
 *   error: Boolean,
 *   response: Obj}]
 */
Directions = new Mongo.Collection(null);

var calledFromTo = {}; // to trace if a call is already sent for a distance, the key is fromAddr + toAddr

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

    var existed = calledFromTo[fromAddr + toAddr];
    if(!existed){
      calledFromTo[fromAddr + toAddr] = true; //mark a call has been sent to prevent repetitive call
      Meteor.call('get',directionURL,{params:base_params},
        function(error,response){
          console.log('call made!', fromAddr, toAddr);
          if (error) {
            //console.log(error);
          }
          else {
            if (response.data.status == "OK") {
              Directions.insert({from: from, to: to, fromAddr:fromAddr, toAddr:toAddr, error: null, response: response});
            } else {
              //console.log('err:',response);
              Directions.insert({from: from, to: to, fromAddr:fromAddr, toAddr:toAddr, error: '路线未找到', response: null});
            }
          }
        }
      ); //end of meteor call
    }
  }
}