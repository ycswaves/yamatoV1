Meteor.subscribe("userData");
Meteor.subscribe("property-images");
Meteor.subscribe("properties");
//Meteor.subscribe("propertyDetail", Meteor.userId()); // subscribed in router
//需要继续修改，一旦改成需要ID，即时消息将接收不到
Meteor.subscribe("messages");
Meteor.subscribe("topics");
// Meteor.subscribe("userProfile", Meteor.userId()); //subscribed in router