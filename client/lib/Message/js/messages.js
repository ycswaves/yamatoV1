//Messages
Template.messages.rendered = function () {
  $('body').popover({
    html : true, 
    selector : '#messageHelper',
    content: function() {
      return $('#message-box').html();
    },
    title: "回复助手",
    placement: "bottom",
    trigger: "click focus",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content background-color-grey-light"></div></div>'
  });

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
        var lastMessage = Messages.findOne({topicId:topic._id,owner:Meteor.userId(),receiver:Meteor.userId()},{sort: {_id : -1}});
        if(lastMessage){
          var sender = Meteor.users.findOne({_id:lastMessage.sender});
          var username = sender.username;
          topic.sender = username;
          topic.message = lastMessage.content;
          returnTopics.push(topic);
        }
      });
      return returnTopics;
    }
    else {
      return false;
    };
  }
});