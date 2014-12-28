Template.header.rendered = function(){

}

Template.header.events({
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
  }
})

Template.header.helpers({
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