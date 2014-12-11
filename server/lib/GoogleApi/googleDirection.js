Meteor.methods({
  'directionTo' : function(url,options){
    return HTTP.get(url,options);
  }
});