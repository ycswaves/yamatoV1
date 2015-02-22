var validateUser = function(){
  var user = Meteor.user();
  if(!user){
    throw new Meteor.Error(401, "You need to login to perform this action");
  }
};

Meteor.methods({
  toggleUserStatus: function(userId, sts){
    validateUser();
    if (Meteor.user().isAdmin) {
      Meteor.users.update(
        {_id : userId},
        {$set: {status: sts}}
      );
    }
  },

  deleteUser: function(userId){
    validateUser();

    filter = (Meteor.user().isAdmin)?
        {_id: userId} : {_id: Meteor.userId()}

    //TODO: Also remember to delete all the posts and avatar

    Meteor.users.remove(filter);
  }
})