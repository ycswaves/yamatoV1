//Login action
Template.loginForm.events({
  //Normal login
  'submit #loginForm' : function(e, t) {
    e.preventDefault();
    var username = trimInput(t.find('input[name=username]').value.toLowerCase())
      , password = t.find('input[name=password]').value;

    if (isNotEmpty(username, 'loginError')
        && isNotEmpty(password, 'loginError')){
      Meteor.loginWithPassword(username, password, function(err){
        if (err && err.error === 403) {
          // Session.set('displayMessage', '用户名或密码不正确');
          FlashMessages.clear();
          FlashMessages.sendError("用户名或密码不正确");
        } else {
          t.$('#loginModal').modal('hide');
          NotificationMessages.sendSuccess('登陆成功','欢迎回来');
          Router.go(Session.get('currentPath') || 'landing');
        }
      });
    }
    return false;
  },
  //facebook login
  'click #facebookLogin' : function(e, t){
    e.preventDefault();
    Meteor.loginWithFacebook(function(err){
      if (err && err.error === 403) {
        Session.set('displayMessage', 'Login Error: email or password is not correct.');
      } else {
        Router.go(Session.get('currentPath') || 'landing');
      }
    });
  },
  //google login
  'click #googleLogin' : function(e, t){
    e.preventDefault();
    Meteor.loginWithGoogle(function(err){
      if (err && err.error === 403) {
        Session.set('displayMessage', 'Login Error: username or password is not correct.');
      } else {
        Router.go(Session.get('currentPath') || 'landing');
      }
    });
  }
});

Template.loginForm.rendered = function() {
  render();
};