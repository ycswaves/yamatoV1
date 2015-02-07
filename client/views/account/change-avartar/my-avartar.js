var cropped;

Template.uploadAvatar.rendered = function() {
  render();
}

Template.uploadAvatar.events({
  'change #avatarImg': function(e, t){
    e.preventDefault();
    var file = t.find('#avatarImg').files[0];
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
  }
})