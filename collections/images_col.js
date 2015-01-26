var STORE_WIDTH = 800;
var STORE_HEIGHT = 600;


var imageStore = new FS.Store.S3("property-images", { //todo: update 'image' to 'property-image'
  region: "ap-southeast-1",
  bucket: "yamato-image", //required
  ACL: "public-read", //optional, default is 'private', but you can allow public or secure access routed through your app URL
  // // The rest are generic store options supported by all storage adapters
  transformWrite: function(fileObj, readStream, writeStream){
    gm(readStream, fileObj.name())
      .size({bufferStream: true}, function (err, size) {
        if (size.width === size.height) {
          //console.log('equal size');
          this.thumbnail(STORE_WIDTH, STORE_HEIGHT);
          this.noProfile();
          this.gravity('Center');
          this.extent(STORE_WIDTH, STORE_HEIGHT);
          this.stream(function (err, stdout, stderr) {
            stdout.pipe(writeStream);
          });
        } else if (size.width > size.height) {
          //console.log('width greater')

          this.thumbnail(STORE_WIDTH + '^', STORE_HEIGHT);
          this.noProfile();
          this.gravity('Center');
          this.extent(STORE_WIDTH, STORE_HEIGHT);
          this.stream(function (err, stdout, stderr) {
            stdout.pipe(writeStream);
          });
        } else {
           //console.log('height greater');
          this.thumbnail(STORE_WIDTH + '^', STORE_HEIGHT);
          this.noProfile();
          this.gravity('Center');
          this.extent(STORE_WIDTH, STORE_HEIGHT);
          this.stream(function (err, stdout, stderr) {
            stdout.pipe(writeStream);
          });
        }
      });
    },
  // transformRead: myTransformReadFunction, //optional
  maxTries: 1 //optional, default 5
});

PropertyImages = new FS.Collection("property-images", {
  stores: [imageStore],
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


PropertyImages.allow({
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