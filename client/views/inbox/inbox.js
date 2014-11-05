Template.inboxPage.rendered = function() {
	$('body').off('click','.topic-item').on('click','.topic-item',function(){
		//set isRead
		Conversations.setReadAsync(Session.get('inbox.topicId'));
		Session.set('inbox.topicId',$(this).data('topicId'));
	});

	$('body').off('keypress','.PMInput').on('keypress','.PMInput',function(e) {
		var input = $(this);
		var topicId = Session.get('inbox.topicId');
		var content = $(this).val();
		if(13==e.which && content!="") {
			e.preventDefault();
			Conversations.sendAsync(topicId,content, function(err, res){
				if(res){
					input.val('');
				}
			})
		}
	});
	render();
}

Template.messageRow.rendered = function() {
	Tracker.afterFlush(function () {
		$('.messagesContainer').scrollTop('9999');
	});
}

Template.inboxPage.helpers({
	topicId: function() {
		var topicId = Session.get('inbox.topicId');
		if(topicId) {
			$(".topic-item").removeClass('active');
			$(".topic-item[data-topic-id='"+topicId+"']").addClass('active');
			return topicId;
		}
		else {
			return false;
		}
	},
	refer: function (topicId) {
		if (typeof topicId != "undefined") {
			var topic = Topics.findOne({_id:topicId});
			var referId = topic.referId;
			var referType = topic.referType;
			switch (referType) {
				case 'Property':
				var property = Properties.findOne({_id:referId});
				var object = {_link:'/property/'+property._id, _title:property.address, _image:property.photos[0]};
				break;
			}
			return object;
		}
		else {
			return false;
		}
	},
	messages : function (topicId) {
		var topic = Topics.findOne({_id:topicId});
		if (topic.creator == Meteor.userId() || topic.chatWith == Meteor.userId()) {
			var messages = Messages.find({topicId:topicId,owner:Meteor.userId()}).fetch();
			return messages;
		}
		else {
			return false;
		}
	},
	topics: function(){
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

