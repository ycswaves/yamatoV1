//Messages
Template.messages.rendered = function () {
  console.log(1);
  $('#messageHelper').popover({
    html : true, 
    content: function() {
      return $('#message-box').html();
    },
    title: "回复助手",
    placement: "bottom",
    trigger: "click",
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content background-color-grey-light"></div></div>'
  });
  console.log(2);
};

Template.messages.helpers({
  messages: function(){
    var count = Messages.find(
      {
        owner: Meteor.userId(),
        isRead: false,
        isValid: true
      }
    ).count();
    if (count > 0) {
      
    }
    else {
      return false;
    };
  }
});