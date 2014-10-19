Meteor.methods({
  addTopic: function(formObj){
  	var user = Meteor.user();
  	if(!user){
  	  throw new Meteor.Error(401, "You need to login to send messages");
  	}
  	var topicId = Topics.insert(formObj, function(err, res) {
      if(err){
        console.log(err);
        return false;
      }
    });
    return topicId;
  },
  addConversation: function(topicId, content) {
    var topic = Topics.findOne({_id:topicId});
    var referId = topic.referId;
    var referType = topic.referType;
    //不同type不同的处理方法
    switch (referType) {
      case 'Property':
        var property = Properties.findOne({_id:referId});
        var author = property.author;
        break;
    }
    if(topic.creator == Meteor.userId()) {
      var sender = Meteor.userId();
      var receiver = author;
    } 
    else if(author == Meteor.userId()) {
      var sender = author;
      var receiver = Meteor.userId();
    } 
    else {
      throw new Meteor.Error(401, "Forbidden");
    }

    //make two copies
    Messages.insert({
      topicId: topic._id,
      owner: sender,
      sender: sender,
      receiver: receiver,
      content: content
    });

    Messages.insert({
      topicId: topic._id,
      owner: receiver,
      sender: sender,
      receiver: receiver,
      content: content
    })
  }
});