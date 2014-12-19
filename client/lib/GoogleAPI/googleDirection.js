var directionURL = "https://maps.googleapis.com/maps/api/directions/json";

GoogleDirection = {
  /**
   * 计算点到点的行程
   * @param  {[string]} from [地址]
   * @param  {[string]} to   [地址]
   * @param  {[string]} mode [driving,walking,bicyling,transit,默认driving]
   * @return {[object]} 
   */
  'to' : function(from, to, mode, callback){
    if (mode == "transit") {
      var params = {
          origin : from,
          destination : to,
          mode : mode,
          departure_time:Math.floor(new Date().getTime()/1000), //一定需要
          alternatives : true
        };
    }
    else {
      var params = {
          origin : from,
          destination : to,
          mode : mode,
          alternatives : true
        };
    }
    Meteor.call('get',directionURL,{
      params:params
    },function(error,response){
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
    })
  },

  shortest : function(from,to,mode,callback) {
    if (mode == "transit") {
      var params = {
          origin : from,
          destination : to,
          mode : mode,
          departure_time:Math.floor(new Date().getTime()/1000) //一定需要
        };
    }
    else {
      var params = {
          origin : from,
          destination : to,
          mode : mode
        };
    }
    Meteor.call('get',directionURL,{
      params:params
    },function(error,response){
      if (error) {
        callback(null);
      }
      else {
        if (response.data.status == "OK") {
          var distance = null;
          var duration = null;
          $.each(response.data.routes, function(i, route){
            distance = route.legs[0].distance.value;
            duration = route.legs[0].duration.value;
          })
          callback({distance:distance,duration:duration});
        }
        else {
          callback(null);
        }
      }
    })
  }
}