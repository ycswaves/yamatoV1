var directionURL = "https://maps.googleapis.com/maps/api/directions/json";

GoogleDirection = {
  /**
   * 计算点到点的行程
   * @param  {[string]} from [地址]
   * @param  {[string]} to   [地址]
   * @param  {[string]} mode [driving,walking,bicyling,transit,默认driving]
   * @return {[object]} 
   */
  'to' : function(from, to, mode){
    Meteor.call('get',directionURL,{
      params:{
        origin : from,
        destination : to,
        mode : mode
      }
    },function(error,response){
      //if an error happened, error argument contains the details
      //if the request succeeded, the response will contain the response of the server request
      if (error) {
        
      }
      else {
        console.log(response);
      }
    })
  }
}