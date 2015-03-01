Template.header.events({
  //sign out
  'click #signout': function(e, t){
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
  'click .chatWithAdmin': function(e, t){
    Conversations.start('','System');
  },

  'click a.languageSetting': function(){
    var curLang = Session.get("language") || "zh";
    if(curLang == "zh"){
      curLang = "en";
    } else {
      curLang = "zh";
    }
    Session.set("language", curLang);

    TAPi18n.setLanguage(curLang)
      .done(function () {
        //Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
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