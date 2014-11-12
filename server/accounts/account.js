Accounts.onCreateUser(function (options, user) {
  var userProfile = {
    userid: user._id,
    name: null,
    avatar: null,
    phone: null,
    qq: null,
    wechat: null,
    email: {address: options.email, verified: false}
  };

  if (user.services.google){
    var oauthProfile = user.services.google;
    userProfile.name = oauthProfile.name

    //in google, the avatar is the entire url staring with 'https://'
    userProfile.avatar = oauthProfile.picture;

    userProfile.email = {address: oauthProfile.email, verified: true}
  }

  if (user.services.facebook){
    var oauthProfile = user.services.facebook;
    userProfile.name = oauthProfile.name
    /*
      in facebook case, avatar is the userid of fb, TODO: need a helper to render the img
      50x50 pixels
      <img src="https://graph.facebook.com/<?= $user_id ?>/picture">

      200 pixels width
      <img src="https://graph.facebook.com/<?= $user_id ?>/picture?type=large">
    */
    userProfile.avatar = oauthProfile.id;
    userProfile.email = {address: oauthProfile.email, verified: true}
  }

  if (userProfile.avatar == null) {
    var url = Gravatar.imageUrl(userProfile.email.address, {
      size: 165,
      d:'identicon'
    });
    userProfile.avatar = url;
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