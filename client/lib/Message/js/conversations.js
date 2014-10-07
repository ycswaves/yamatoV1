conversations = new Meteor.Collection(null);

Conversations = {
  init: function(topicId) {
    conversations.insert({ topicId:topicId});
  }
}