// Validators, helpers

// Trim Input
function trimInput(val) {
  return val.replace(/^\s*|\s*$/g, "");
}

// Validations
function isEmail(val) {
  if (val.indexOf('@') !== -1) {
      return true;
    } else {
      Session.set('displayMessage', 'Error & Please enter a valid email address.');
      return false;
    }
}

function isValidPassword(val) {
  if (val.length >= 6) {
    return true;
  } else {
    Session.set('displayMessage', 'Error & Your password should be 6 characters or longer.');
    return false;
  }
}

function isNotEmpty(val) {
  // if null or empty, return false
  if (!val || val === ''){
    Session.set('displayMessage', 'Error & Please fill in all required fields.');
    return false;
  }
  return true;
}

function isValidType(val) {
  console.log(val);
  // if null or empty, return false
  if (val!=1 && val!=2 ){
    Session.set('displayMessage', 'Error & Undefined Type.');
    return false;
  }
  return true;
}

function isSame(val1,val2) {
  // if not the same the passwords
  if(val1 !== val2 ){
    Session.set('displayMessage', 'Error & Your passwords are not the same');
    return false;
  }
  return true;
}

function isValidName(val){
  userRegex = /^[-\w\.\$@\*\!]{1,30}$/;
  if(!val.match(userRegex)){
    Session.set('displayMessage', 'Error & invalid username');
    return false;
  }
  return true;
}

//Login action
Template.loginForm.events({
  //Normal login
  'submit #loginForm' : function(e, t) {
    e.preventDefault();
    var username = trimInput(t.find('input[name=username]').value.toLowerCase())
      , password = t.find('input[name=password]').value;

    if (isNotEmpty(username, 'loginError')
        && isNotEmpty(password, 'loginError'))
    {
      Meteor.loginWithPassword(username, password, function(err){
        if (err && err.error === 403) {
          // Session.set('displayMessage', '用户名或密码不正确');
          FlashMessages.clear();
          FlashMessages.sendError("用户名或密码不正确");
        } else {
          t.$('#loginModal').modal('hide');
          NotificationMessages.sendSuccess('登陆成功','欢迎回来');
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

      }
    });
  }
});

// Create an account and login the user.
Template.signupForm.events({
  'submit #signupForm' : function(e, t) {
    e.preventDefault();
    var email = trimInput(t.find('input[name=email]').value.toLowerCase())
      , password = t.find('input[name=password]').value
      , password2 = t.find('input[name=passwordAgain]').value
      , username = t.find('input[name=username]').value;
    if (isNotEmpty(email)
        && isNotEmpty(password)
        && isEmail(email)
        && isValidPassword(password)
        && isSame(password,password2)
        && isNotEmpty(username)
        && isValidName(username))
    {
      Accounts.createUser({
        username:username,
        email:email,
        password: password
      }, function(err){
        if (err && err.error === 403) {
          Session.set('displayMessage', '创建账户不成功 &' + err.reason);
        } else {
          t.$('#signupModal').modal('hide');
          NotificationMessages.sendSuccess('注册成功','欢迎您的加入');
        }
      });
    }else{

    }
    return false;
  }

});

Template.signupForm.helpers({
  agency: function(){
  	return Config.getAgency();
  }
})

Template.header.events({
  //sign out
  'click #signout' : function(e, t){
    e.preventDefault();
    Meteor.logout(function(){
      Router.go('landing');
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
        messages: {
          owner: Meteor.userId(),
          isRead: false,
          isValid: true
        }
      }
    ).count();
    return count || false;
  }
})