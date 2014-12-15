Meteor.methods({
  'get' : function(url,options){
    return HTTP.get(url,options);
  },
  'googleMapAPI' : function(url,options){
    options.params.key = process.env.GOOGLE_MAP_API_KEY;
    return HTTP.get(url,options);
  }
});