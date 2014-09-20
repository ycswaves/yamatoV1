//Notifications
Template.notificationMessage.rendered = function () {
  var message = this.data;
  Meteor.defer(function() {
    notificationMessages.update(message._id, {$set: {seen: true}});
  });
  if (message.options && message.options.autoHide) {
    $message = $(this.find('.message'));
    Meteor.setTimeout(function() {
        $message.fadeOut(400, function() {
          notificationMessages.remove({_id: message._id});
        });    
      }, 
      message.options.hideDelay);
  }
};

Template.notificationMessages.helpers({
   notifications : function () {
    if (notificationMessages.find().count() && NotificationMessages.options.autoScroll)
      $('html, body').animate({
        scrollTop: 0
      }, 200);
    var messages = notificationMessages.find().fetch();
    $.each(messages, function(index, value) {
      value.group = value.message instanceof Array;
    });
    return messages;
  }
});

Template.notificationMessage.events({
  "click .close": function (e, tmpl) {
    e.preventDefault();
    notificationMessages.remove(tmpl.data._id);
  }
});

Template.notificationMessages.events({
  "click .close": function (e, tmpl) {
    e.preventDefault();
    notificationMessages.remove({});
  }
});

//Messages
Template.replyMessages.rendered = function () {
  $('#replyHelper').popover({
    html : true, 
    content: function() {
      return $('#reply-box').html();
    },
    title: "回复助手",
    placement: "bottom",
    trigger: "click",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content background-color-grey-light"></div></div>'
  });
};