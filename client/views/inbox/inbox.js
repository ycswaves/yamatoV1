Template.inboxPage.rendered = function() {
    render();
}

Template.inboxPage.helpers({
  messages: function(){
		var unreads = Messages.find(
			{
				owner: Meteor.userId(),
				isValid: true
			}
		);
		if (unreads.count() > 0) {
			var returnTopics = [];
			var groupedTopics = _.groupBy(_.pluck(unreads.fetch(), 'topicId'));
			_.each(_.values(groupedTopics), function(topics) {
				var topic = Topics.findOne({_id:topics[0]});
				if(topic){
					var lastMessage = Messages.findOne({topicId:topic._id,owner:Meteor.userId(),receiver:Meteor.userId()},{sort: {createdAt : -1}});
					if(lastMessage){
						var sender = Meteor.users.findOne({_id:lastMessage.sender});
						var username = sender.username;
						topic.sender = username;
						topic.message = lastMessage.content;
						topic.lastTime = moment(lastMessage.createdAt).fromNow();
						returnTopics.push(topic);
					}
				}
			});
			return returnTopics;
		}
		else {
			return false;
		};
	}
});