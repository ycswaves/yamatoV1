conversations = new Meteor.Collection(null);

Conversations = {
	init: function(topicId) {
		if(conversations.find({topicId:topicId}).count() == 0){
			conversations.insert({topicId:topicId});
		}
	},
	remove: function(topicId) {
		if(conversations.find({topicId:topicId}).count() == 1){
			conversations.remove({topicId:topicId});
		}
	},
	start: function(referId, type) {
		//means there is no same topic
		if(Topics.find({creator:Meteor.userId(),referId:referId}).count() == 0) {
			var formObj = {
				creator: Meteor.userId(),
				referId: referId,
				referType: type
			};
			Meteor.call('addTopic', formObj, function(err, topicId){
				if(err){
					console.log('Add Topic: '+err);
					return false;
				}
				Conversations.init(topicId);
			});
		}
		else {
			var topic = Topics.findOne({creator:Meteor.userId(),referId:referId});
			Conversations.init(topic._id);
		}
	},
	sendAsync: function(topicId, content, callback) {
		Meteor.call('addConversation',topicId,content,function(err, res){
			if(err){
				console.log('Send PM: '+err);
				callback(err. false);
			}
			callback(null, res);
		});
	},
	setReadAsync: function(topicId) {
		Meteor.call('readConversation',topicId);
	}
}

Template.conversationTopics.helpers({
	conversationTopics : function () {
		var conversationTopics = conversations.find().fetch();
		return conversationTopics;
	}
});

Template.conversationTopic.helpers({
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
	chatWith : function (topicId) {
		var topic = Topics.findOne({_id:topicId});
		if(topic.creator == Meteor.userId()) {
			var userId = topic.chatWith;
		}
		else {
			var userId = topic.creator;
		}
		var chatWith = Meteor.users.findOne({_id: userId});
		return chatWith.username;
	},
	refer: function (topicId) {
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
});

Template.messageRow.helpers({
	isOwn : function (ownerId,senderId) {
		if(ownerId==senderId) {
			return true;
		}
		else{
			return false;
		}
	}
});


Template.messageRow.rendered = function() {
	Tracker.afterFlush(function () {
		$('.messagesContainer').scrollTop('9999');
	});
}

Template.conversationTopic.rendered = function () {
	$('body').off('keypress','.PMInput').on('keypress','.PMInput',function(e) {
		var input = $(this);
		var topicId = $(this).data('topicId');
		var content = $(this).val();
		if(13==e.which && content!="") {	
			e.preventDefault();
			Conversations.sendAsync(topicId,content, function(err, res){
				if(res){
					input.val('');
				}
			})
		}
	})

	$('body').off('click','.cancelButton').on('click','.cancelButton',function(){
		var topicId = $(this).data('topicId');
		Conversations.remove(topicId);
	})

	$('body').off('click','.closeConversation').on('click','.closeConversation',function(){
		$(this).parents('.Conversation').find('.popover').fadeOut(200);
	});

	$('body').off('click','.topicAvatar').on('click','.topicAvatar',function(){
		$('.Conversation').find('.popover').not($(this).parent().find('.popover')).fadeOut(200);
		$(this).parent().find('.popover').fadeToggle(200);
		$(this).parent().find('.messagesContainer').scrollTop('9999');
	});

	$('body').off('mouseenter','.topicAvatar,.cancelButton').on('mouseenter','.topicAvatar,.cancelButton',function(){
		$(this).parent().find('.cancelButton').css('visibility','visible');
	});

	$('body').off('mouseleave','.topicAvatar,.cancelButton').on('mouseleave','.topicAvatar,.cancelButton',function(){
		$(this).parent().find('.cancelButton').css('visibility','hidden');
	});
}