conversations = new Meteor.Collection(null);

Conversations = {
  init: function(topicId) {
    if(conversations.find({topicId:topicId}).fetch.length == 0){
      conversations.insert({topicId:topicId});
    }
  }
}