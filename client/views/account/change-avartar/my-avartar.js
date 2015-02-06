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
      }
      reader.readAsDataURL(file);

      var image = $(".img-container img"),
    dataX = $("#dataX"),
    dataY = $("#dataY"),
    dataHeight = $("#dataHeight"),
    dataWidth = $("#dataWidth");

  image.cropper({
    aspectRatio: 16 / 9,
    data: {
      x: 480,
      y: 60,
      width: 640,
      height: 360
    },
    preview: ".img-preview",
    done: function(data) {
      dataX.val(Math.round(data.x));
      dataY.val(Math.round(data.y));
      dataHeight.val(Math.round(data.height));
      dataWidth.val(Math.round(data.width));
    }
  });

    }
  }
})