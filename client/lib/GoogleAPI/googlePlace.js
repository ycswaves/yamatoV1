var nearbysearchURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

GooglePlace = {
  /**
   * 计算点到点的行程
   * @param  {[string]} from [地址]
   * @param  {[string]} to   [地址]
   * @param  {[string]} mode [driving,walking,bicyling,transit,默认driving]
   * @return {[object]}
   */
  'getNearby' : function(lat, lng, types, callback){
    Meteor.call('get', nearbysearchURL, {
      params:{
        location : lat+','+lng,
        rankby : 'distance',
        types : types,
        key: "AIzaSyD-zbrbvEiToGGwKf3Lk_4arOkZrKBuEtw"
      }
    },function(error,response){
      //if an error happened, error argument contains the details
      //if the request succeeded, the response will contain the response of the server request
      if (error) {

      }
      else {
        callback(error, response.data);
      }
    })
  }
}