var cropped, file;

Template.uploadAvatar.rendered = function() {
  render();
}

Template.uploadAvatar.events({
  'change #avatarImg': function(e, t){
    e.preventDefault();
    file = t.find('#avatarImg').files[0];
    if(file){
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#previewAvatar').attr('src', e.target.result);
        var image = $(".img-container img");


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
    console.log(cropped);
    var FSObj = new FS.File(file);
    FSObj['cropInfo'] = cropped;
    //FSObj.attachData(JSON.stringify(cropped));
    avatarImages.insert(FSObj, function(err, imageUploaded){
      if(err){
        console.log(err);
        //bcoz it's async, even if upload fail, the rest fields should be saved
        // and redirect to the property detail
      } else {
        console.log(imageUploaded._id);
      }
    });
  }
})