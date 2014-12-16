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
        
      }
      else {
        callback(response.data);
      }
    })
  }
}