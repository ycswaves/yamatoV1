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
  start: function(referId, type, chatWith) {
    //means there is no same topic
    var searchCondition = {creator:Meteor.userId(),referId:referId,referType:type};
    switch (type) {
      case 'System':
      searchCondition = {creator:Meteor.userId(),referType:type};
    }
    
    if(Topics.find(searchCondition).count() == 0) {
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
      var topic = Topics.findOne(searchCondition);
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
  enter : function() {
    return function(stateModifier, done) {
      stateModifier.setOpacity(0); // hide initially
      // fadeIn and invoke done() on completion
      stateModifier.setOpacity(1, { duration: 500, curve: 'easeOut' }, done);
    };
  },
  leave : function() {
    return function(stateModifier, done) {
      // fadeOut and invoke done() on completion
      stateModifier.setOpacity(0, { duration: 500, curve: 'easeOut' }, done);
    };
  }
});

Template.fullscreenChat.helpers({
  isAdmin : function (topicId) {
    var topic = Topics.findOne({_id:topicId});
    if (typeof topic != "undefined") {
      if(topic.creator == Meteor.userId()) {
        var userId = topic.chatWith;
      }
      else {
        var userId = topic.creator;
      }
      var chatWith = Meteor.users.findOne({_id: userId});
      return chatWith.isAdmin;
    }
    else {
      return null;
    }
  },
  messages : function () {
    var topicId = Session.get('Conversation.currentTopicId');
    var topic = Topics.findOne({_id:topicId});
    if (typeof topic != "undefined") {
      if (topic.creator == Meteor.userId() || topic.chatWith == Meteor.userId()) {
        var messages = Messages.find({topicId:topicId,owner:Meteor.userId()}).fetch();
        return messages;
      }
      else {
        return false;
      }
    }
    else {
      return null;
    }
  },
  refer: function () {
    var object = false;
    var topicId = Session.get('Conversation.currentTopicId');
    if (typeof topicId != "undefined") {
      var topic = Topics.findOne({_id:topicId});
      if (typeof topic != "undefined") {
        var referId = topic.referId;
        var referType = topic.referType;
        switch (referType) {
          case 'Property':
          var property = Properties.findOne({_id:referId});
          var object = {_link:'/property/'+property._id, _title:property.address, _image:property.photos[0]};
          break;
          case 'System':
          case 'Common':
          break;
        }
      }
    }
    return object;
  },
  topicId: function () {
    return Session.get('Conversation.currentTopicId');
  },
  hasRefer: function(refer) {
    if (typeof refer == 'object') {
      return 'hasRefer';
    }
    else {
      return null;
    }
  }
})

Template.messageRow.helpers({
  isOwn : function (ownerId,senderId) {
    if(ownerId==senderId) {
      return true;
    }
    else{
      return false;
    }
  },
  formatMoment: function(datetime) {
    return moment(datetime).fromNow();
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
    var topicId = Session.get('Conversation.currentTopicId');
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
    var topicId = $(this).data('topicId');
    Session.set('Conversation.currentTopicId',topicId);
  });

  $('body').off('mouseenter','.topicAvatar,.cancelButton').on('mouseenter','.topicAvatar,.cancelButton',function(){
    $(this).parent().find('.cancelButton').css('visibility','visible');
  });

  $('body').off('mouseleave','.topicAvatar,.cancelButton').on('mouseleave','.topicAvatar,.cancelButton',function(){
    $(this).parent().find('.cancelButton').css('visibility','hidden');
  });
}