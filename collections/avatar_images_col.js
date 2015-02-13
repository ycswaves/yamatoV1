
var avatarImgStore = new FS.Store.S3("avatar-images", { //"avatar-images" is the S3 folder name
  region: "ap-southeast-1",
  bucket: "yamato-image", //required
  ACL: "public-read", //optional, default is 'private', but you can allow public or secure access routed through your app URL
  // // The rest are generic store options supported by all storage adapters
  transformWrite: function(fileObj, readStream, writeStream){
    var cropConf = fileObj.cropInfo;
    gm(readStream)
      .crop(cropConf.width, cropConf.height, cropConf.x, cropConf.y)
      .stream(function (err, stdout, stderr) {
        if(err){
          console.log(err);
        }
        stdout.pipe(writeStream);
      });
  },
  // transformRead: myTransformReadFunction, //optional
  maxTries: 1 //optional, default 5
});

AvatarImages = new FS.Collection("avatar-images", {
  stores: [avatarImgStore],
  filter: {
    allow: {
      contentTypes: ['image/*'], //allow only images in this FS.Collection
      extensions: ['jpeg','jpg','png','JPEG','JPG','PNG']
    },
    onInvalid: function (message) {
      if (Meteor.isClient) {
        swal('', '图片格式不对，上传失败.', 'error');
      } else {
        //console.log(message);
      }
    }
  }
});


AvatarImages.allow({
  insert: function(userId) {
    return !!userId;
  },
  update: function(userId) {
    return !!userId;
  }
  // remove: function(userId) {
  //   return !!userId;
  // },
  // download: function(userId) {
  //   return true;
  // },
  // fetch: []
});