Meteor.startup(function() {
  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
  Accounts.emailTemplates.from = '家易 <no-reply@yiho.me>';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'www.yiho.me';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return '请确认您在家易的邮箱地址';
  };

  // A Function that takes a user object and a url, and returns the body text for the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.html = function(user, url) {
    return Handlebars.templates['verify']({name:user.username, url: url});
  };

  Accounts.emailTemplates.resetPassword.subject = function(user) {
    return '设置新密码';
  };

  Accounts.emailTemplates.resetPassword.html = function(user, url) {
    return Handlebars.templates['reset']({name:user.username, url: url});
  };
});

Meteor.methods({
  sendVerificationEmail:function(userId){
    Accounts.sendVerificationEmail(userId);
  }
});