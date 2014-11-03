Template.inboxPage.rendered = function() {
	render();
}

Template.inboxPage.helpers({
	messages: function(){
		var topics = Topics.find({
			$or: [
				{creator: Meteor.userId()},
				{chatWith: Meteor.userId()}
			]
		});
		if (topics.count() > 0) {
			var returnTopics = [];
			$.each(topics.fetch(), function(index, topic) {
				var talkTo = topic.creator;
				if (topic.creator == Meteor.userId()) {
					talkTo = topic.chatWith;
				}
				var lastMessage = Messages.findOne({topicId:topic._id,owner:Meteor.userId()},{sort: {createdAt : -1}});
				if(lastMessage){
					var sender = Meteor.users.findOne({_id:talkTo});
					var username = sender.username;
					topic.sender = username;
					topic.message = lastMessage.content;
					topic.lastTime = moment(lastMessage.createdAt).fromNow();
					topic.mine = false;
					if (lastMessage.sender == Meteor.userId()) {
						topic.mine = true;
					}
					returnTopics.push(topic);
				}
			});
			return returnTopics;
		}
		else {
			return false;
		}
	}
});