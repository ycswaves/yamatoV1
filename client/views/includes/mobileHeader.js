Template.mobileHeader.rendered = function(){

}

Template.mobileHeader.events({
  //sign out
  'click #signout' : function(e, t){
    e.preventDefault();
    Meteor.logout(function(){
      conversations.remove({});
      if (typeof Session.get('currentPath') != 'undefined') {
        Router.go(Session.get('currentPath')); //返回当前页面
      }
      else {
        Router.go('landing');
      }
      delete Session.keys['currentPath']; //删除当前Session
      delete Session.keys['resetPassword'];
    });
  },
  //chat with admin
  'click .chatWithAdmin' : function(e, t){
    Conversations.start('','System');
  }
})

Template.mobileHeader.helpers({
  loggedInUser: function(){
    return Meteor.user();
  },
  messageCount: function(){
    var count = Messages.find(
      {
        owner: Meteor.userId(),
        receiver: Meteor.userId(),
        isRead: false,
        isValid: true
      }
    ).count();
    return count || false;
  }
})