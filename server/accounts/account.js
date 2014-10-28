Accounts.onCreateUser(function (options, user) {
  // We still want the default hook's 'profile' behavior.
  // if (options.profile)
  //   user.profile = options.profile;
  // return user;
  var userProfile = {
    userid: user._id,
    name: null,
    avatar: null,
    phone: null,
    qq: null,
    wechat: null,
    email: {address: options.email, verified: false}
  };


  // console.log(user.services);
  // return;

  if (user.services.google){
    var oauthProfile = user.services.google;
    console.log(oauthProfile);
    return false;
    // userProfile.name = oauthProfile.name
    // userProfile.email = {address: oauthProfile.email, verified: true}
  }

  if (user.services.facebook){
    var oauthProfile = user.services.facebook;
    userProfile.name = oauthProfile.name
    userProfile.email = {address: oauthProfile.email, verified: true}
  }

  UserProfiles.insert(userProfile, function(err, res) {
    if(err){
      console.log(err); // need to log to see if any attack or form validation not cover enough
      return false;
    }
  });

  //return user;
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