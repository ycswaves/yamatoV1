Accounts.onCreateUser(function (options, user) {
  var userProfile = {
    userid: user._id,
    name: null,
    avatar: null,
    phone: null,
    qq: null,
    wechat: null
  };

  if (user.services.google){
    var oauthProfile = user.services.google;
    userProfile.name = oauthProfile.name
  }
  else if (user.services.facebook){
    var oauthProfile = user.services.facebook;
    userProfile.name = oauthProfile.name
  }

  UserProfiles.insert(userProfile, function(err, res) {
    if(err){
      console.log(err); // need to log to see if any attack or form validation not cover enough
      return false;
    }
  });

  return user;
});

Meteor.methods({
  editProfile: function(userId, formObj){
    var user = Meteor.user();
    if(!user){
      throw new Meteor.Error(401, "You need to login to edit");
    }
    UserProfiles.update({userid: userId}, {$set: formObj});
  }
});