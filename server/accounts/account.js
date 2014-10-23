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
  if (options.profile){

  }
  UserProfiles.insert(userProfile, function(err, res) {
    if(err){
      console.log(err); // need to log to see if any attack or form validation not cover enough
      return false;
    }
  });

  return user;
});