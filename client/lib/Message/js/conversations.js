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

Template.conversationTopics.rendered = function () {
  // $('body').popover({
  //   html : true, 
  //   selector : '.Conversation',
  //   content: function() {
  //     return $('#message-box').html();
  //   },
  //   title: "回复助手",
  //   placement: "right",
  //   trigger: "click",
  //   template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content background-color-grey-light"></div></div>'
  // });
}