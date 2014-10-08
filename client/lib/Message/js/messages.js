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
    trigger: "click",
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
        isRead: false,
        isValid: true
      }
    );
    if (unreads.count() > 0) {
      var returnTopics = [];
      var groupedTopics = _.groupBy(_.pluck(unreads.fetch(), 'topicId'));
      _.each(_.values(groupedTopics), function(topics) {
        var topic = Topics.find({_id:topics[0]}).fetch();
        returnTopics.push(topic[0]);
      });
      return returnTopics;
    }
    else {
      return false;
    };
  }
});