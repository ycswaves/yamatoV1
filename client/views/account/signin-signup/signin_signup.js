Meteor.autorun(function(){
  if (Meteor.user()) {
    if (typeof Meteor.user().status !== "undefined") {
      if (Meteor.user().status === "blocked") {
        Meteor.logout(function(){
          swal("注意!", "您的账号因某原因被封停，请联系管理员!", "warning");
        });  
      }   
    }
  }
});

Template.forgotPassPopup.events({
  'click #forgotPassBtn' : function(e, t) {
    var email = t.find('input[name=email]').value;
    Accounts.forgotPassword({email:email}, function(err){
      if (typeof err == 'undefined') {
        swal('验证邮箱', '一封验证邮件已发送，请查收', 'success');
        $('#forgotPassModal').modal('hide');
      }
      else {
        swal('验证邮箱', '邮件发送失败，未找到相关账号', 'error');
      }
    })
  }
});

Template.resetPassPopup.events({
  'click #resetPassBtn' : function(e, t) {
    var newpass = t.find('input[name=newpass]').value
    , repeatpass = t.find('input[name=repeatpass]').value;
    if (isSame(newpass,repeatpass) && isValidPassword(newpass)) {
      token = Session.get('resetPassword');
      Accounts.resetPassword(token,newpass,function(err){
        if (typeof err == 'undefined') {
          swal('重置密码', '密码已重置，请牢记新密码', 'success');
          $('#resetPassModal').modal('hide');
        }
        else {
          swal('重置密码', '密码失败，请重试', 'error');
        }
        delete Session.keys['resetPassword'];
      })
    }
  }
});

//Login action
Template.signin.events({
  //Normal login
  'submit #signinForm' : function(e, t) {
    e.preventDefault();
    var username = trimInput(t.find('input[name=username]').value.toLowerCase())
    , password = t.find('input[name=password]').value;

    if (isNotEmpty(username) && isNotEmpty(password)){
      Meteor.loginWithPassword(username, password, function(err){
        if (err && err.error === 403) {
          FlashMessages.clear();
          FlashMessages.sendError("用户名或密码不正确");
        } else {
          if (CommonHelper.checkCurrentUserStatus() == 'active') {
            NotificationMessages.sendSuccess('登陆成功','欢迎回来');
          }
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
  },
  'click #forgetPassLink' : function(){
    $('#forgotPassModal').modal('show');
  }
});

Template.signin.rendered = function() {
  render();
};

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
    FlashMessages.clear();
    FlashMessages.sendError("无效邮箱地址");
    return false;
  }
}

function isValidPassword(val) {
  if (val.length >= 6) {
    return true;
  } else {
    FlashMessages.clear();
    FlashMessages.sendError("请输入六位以上的密码");
    return false;
  }
}

function isNotEmpty(val) {
  // if null or empty, return false
  if (!val || val === ''){
    FlashMessages.clear();
    FlashMessages.sendError("请填写所有必须填写的栏目");
    return false;
  }
  return true;
}

function isValidType(val) {
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
    FlashMessages.clear();
    FlashMessages.sendError("重复输入密码不同");
    return false;
  }
  return true;
}

function isValidName(val){
  userRegex = /^[-\w\.\$@\*\!]{1,30}$/;
  if(!val.match(userRegex)){
    FlashMessages.clear();
    FlashMessages.sendError("无效用户名");
    return false;
  }
  if (val.length < 3) {
    FlashMessages.clear();
    FlashMessages.sendError("用户名需要三位数以上");
    return false;
  }
  return true;
}

// Create an account and login the user.
Template.signup.events({
  'submit #signupForm' : function(e, t) {
    e.preventDefault();
    var email = trimInput(t.find('input[name=email]').value.toLowerCase())
    , password = t.find('input[name=password]').value
    , username = t.find('input[name=username]').value;
    if (isNotEmpty(email)
      && isNotEmpty(password)
      && isEmail(email)
      && isValidPassword(password)
      && isNotEmpty(username)
      && isValidName(username))
    {
      Accounts.createUser({
        username: username,
        email: email,
        password: password
      }, function(err){
        if (err && err.error === 403) {
          FlashMessages.clear();
          FlashMessages.sendError(err.reason);
        } else {
          //send verification email
          Meteor.call("sendVerificationEmail",Meteor.userId());
          swal('验证邮箱', '一封验证邮件已发送，请查收', 'success');
          NotificationMessages.sendSuccess('注册成功','欢迎您的加入');
          Router.go(Session.get('currentPath') || 'landing');
        }
      });
    }
    return false;
  }

});

Template.signup.rendered = function() {
  render();
};