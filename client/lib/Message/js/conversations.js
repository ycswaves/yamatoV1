conversations = new Meteor.Collection(null);

Conversations = {
  init: function(topicId) {
    if(conversations.find({topicId:topicId}).count() == 0){
      conversations.insert({topicId:topicId});
    }
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
  console.log(1);
  $('.Conversation').popover({
    html : true, 
    // selector : '.Conversation',
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