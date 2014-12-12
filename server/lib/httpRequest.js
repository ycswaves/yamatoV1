Meteor.methods({
  'get' : function(url,options){
    return HTTP.get(url,options);
  }
});