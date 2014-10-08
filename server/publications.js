//publish function first Params is used by subscription
Meteor.publish('userData', function () {
    return Meteor.users.find();
});

Meteor.publish("property-images", function() {
  return PropertyImages.find();
});

Meteor.publish("properties", function() {
  // TODO: limit to 5 first
  return Properties.find({}, {sort: {createdAt: -1}});
});

Meteor.publish("propertyDetail", function(id) {
  return Properties.find({_id: id});
});

Meteor.publish("myProperty", function(id) {
  return Properties.find({author: id});
});

Meteor.publish("messages", function() {
  return Messages.find({});
});

Meteor.publish("topics", function() {
  return Topics.find({});
});