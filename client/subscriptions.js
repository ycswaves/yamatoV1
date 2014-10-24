Meteor.subscribe("userData");
Meteor.subscribe("property-images");
Meteor.subscribe("properties");
//Meteor.subscribe("propertyDetail", Meteor.userId()); // subscribed in router
Meteor.subscribe("messages", Meteor.userId());
Meteor.subscribe("topics");
// Meteor.subscribe("userProfile", Meteor.userId()); //subscribed in router