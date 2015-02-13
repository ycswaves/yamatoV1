//publish function first Params is used by subscription
Meteor.publish('userData', function () {
    return Meteor.users.find();
});

Meteor.publish('currentUserData', function (userId) {
    return Meteor.users.find({_id:userId});
});

Meteor.publish("property-images", function() {
  return PropertyImages.find();
});

Meteor.publish("avatar-images", function() {
  return AvatarImages.find();
});

Meteor.publish("properties", function() {
  return Properties.find({}, {sort: {createdAt: -1}});
});

Meteor.publish("propertyDetail", function(id) {
  return Properties.find({_id: id});
});

Meteor.publish("myProperty", function(id) {
  return Properties.find({author: id});
});

// Meteor.publish("messages", function(id) {
//   return Messages.find({owner:id});
// });

Meteor.publish("messages", function() {
  return Messages.find();
});

Meteor.publish("topicMessages", function(topicId,userId) {
  return Messages.find({topicId:topicId,owner:userId});
});

Meteor.publish("topics", function() {
  return Topics.find({});
});

Meteor.publish("userProfile", function(id) {
  return UserProfiles.find({userid: id});
});

Meteor.publish("propertyNearby", function(id) {
  return NearbyCollection.find({propertyId: id});
});