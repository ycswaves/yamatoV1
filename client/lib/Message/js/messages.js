//Messages
Template.messages.rendered = function () {
	$('body').off('click','#messageHelper').on('click','#messageHelper',function(){
		$(this).parent().find('.popover').fadeToggle(200);
	})

	$('body').off('click','#bodyContent').on('click','#bodyContent',function(){
		$('.popover').fadeOut();
	})

	//click on the message
	$('body').on('click', '.message-line', function (e) {
		var topicId = $(this).data('topicId');
		//add into conversation once click
		Conversations.init(topicId);
	});
};

Template.messages.helpers({
	messages: function(){
		var unreads = Messages.find(
			{
				owner: Meteor.userId(),
				receiver: Meteor.userId(),
				isRead: false,
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