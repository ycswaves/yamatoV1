Template.header.rendered = function(){
  // fix nav bar collapse not folding on mobile after clicking links on it
  $(document).on('click.nav','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') || $(e.target).is('button')) {
      $(this).collapse('hide');
    }
  });
}

Template.header.events({
  //sign out
  'click #signout' : function(e, t){
    e.preventDefault();
    Meteor.logout(function(){
      conversations.remove({});
      Router.go(Session.get('currentPath')); //返回当前页面
      delete Session.keys['currentPath']; //删除当前Session
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