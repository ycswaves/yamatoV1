//publish function first Params is used by subscription
Meteor.publish('userData', function () {
    return Meteor.users.find();
});

Meteor.publish("images", function() {
  return Images.find();
});

Meteor.publish("properties", function() {
  // TODO: limit to 5 first
  return Properties.find({}, {sort: {createdAt: -1}, limit: 5});
});

Meteor.publish("propertyDetail", function(id) {
  return Properties.find({_id: id});
});