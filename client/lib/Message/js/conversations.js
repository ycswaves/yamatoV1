conversations = new Meteor.Collection(null);

Conversations = {
	init: function(topicId) {
		if(conversations.find({topicId:topicId}).count() == 0){
			conversations.insert({topicId:topicId});
		}
	},
	start: function(referId, type) {
		//means there is no same topic
		if(Topics.find({creator:Meteor.userId(),referId:referId}).count() == 0) {
			var formObj = {
				creator: Meteor.userId(),
				referId: referId
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
	retrieve: function(topicId) {
		var messages = Messages.find({topicId:topicId,owner:Meteor.userId()}).fetch();

		Meteor.call('retrieveConversation',topicId,function(err,data){
			if(err){
				console.log('Send PM: '+err);
				callback(err, []);
			}
			callback(null, data);
		});
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
		var messages = Messages.find({topicId:topicId,owner:Meteor.userId()}).fetch();
		return messages;
	}
});

Template.conversationTopic.rendered = function () {
	$('body').on('keypress','.PMInput',function(e) {
		var topicId = $(this).data('topicId');
		var content = $(this).val();
		if(10==e.which && content!="") {	
			Conversations.sendAsync(topicId,content, function(err, res){
				if(res){
					$('.PMInput').val('');
				}
			})
		}
	})
	/*
	$('.headWrapper').popover({
		html : true, 
		content: function() {
			return $('#conversation-box').html();
		},
		title: "私信",
		animation: false,
		placement: "right",
		trigger: "click",
		template: '<div class="popover conversation-popover" role="tooltip"><div class="arrow sidearrow"></div><h3 class="popover-title"></h3><div class="popover-content conversation-content background-color-grey-light"></div></div>'
	});

	$('.Conversation').on('shown.bs.popover', function () {
		$('.conversation-popover').css('top',parseInt($('.conversation-popover').css('top')) - 156 + 'px')
	});
	*/

	$('body').on('mouseenter','.Conversation',function(){
		$('.Conversation').find('.cancelButton').css('visibility','visible');
	});

	$('body').on('mouseleave','.Conversation',function(){
		$('.Conversation').find('.cancelButton').css('visibility','hidden');
	});
}