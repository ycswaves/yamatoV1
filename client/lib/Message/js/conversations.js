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
  send: function(topicId, content) {
    Meteor.call('addConversation',topicId,content,function(err){
      if(err){
        console.log('Send PM: '+err);
        return false;
      }
    });
  }
}

Template.conversationTopics.helpers({
   conversationTopics : function () {
    var conversationTopics = conversations.find().fetch();
    $.each(conversationTopics, function(index, value) {
      value.group = value.message instanceof Array;
    });
    return conversationTopics;
  }
});

Template.conversationTopic.rendered = function () {
  $('.Conversation').popover({
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
  })
}