var cropped, file;

Template.uploadAvatar.rendered = function() {
  render();
}

Template.uploadAvatar.events({
  'change #avatarImg': function(e, t){
    e.preventDefault();
    var image = $(".img-container img");
    file = t.find('#avatarImg').files[0];
    if(file){
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#previewAvatar').attr('src', e.target.result);
        image.cropper({
          aspectRatio: 1,

          preview: ".img-preview",
          data: {
            x: 100,
            y: 50
          },
          done: function(data) {
            cropped = data;
          }
        });
      }
      reader.readAsDataURL(file);
    }
  },

  'click #confirm': function(){
    var FSObj = new FS.File(file);
    FSObj['cropInfo'] = cropped;

    // TODO: also delelte avatar when user is deleted
    // check previouly uploaded img, if there is, need to delete
    var profile = UserProfiles.findOne({userid: Meteor.userId()});
    if (typeof profile != 'undefined' && profile.avatar != null) {
      Meteor.call('deleteAvatarImg', profile.avatar, function(err){
        if(err){
          console.log(err);
        }
      });
    }

    AvatarImages.insert(FSObj, function(err, imageUploaded){
      if(err){
        console.log(err);
        //bcoz it's async, even if upload fail, the rest fields should be saved
        // and redirect to the property detail
      } else {
        //update user profile and insert avatar's ID. Not store link becoz it's not ready at this point
        Meteor.call('editProfile', Meteor.userId(), {avatar: imageUploaded._id}, function(err){
          if(err){
            console.log(err);
          }
        });
      }
    });
  }
})