var imageStore = new FS.Store.S3("images", { //todo: update 'image' to 'property-image'
  region: "ap-southeast-1",
  bucket: "yamato-image", //required
  ACL: "public-read", //optional, default is 'private', but you can allow public or secure access routed through your app URL
  // // The rest are generic store options supported by all storage adapters
  // transformWrite: myTransformWriteFunction, //optional
  // transformRead: myTransformReadFunction, //optional
  maxTries: 1 //optional, default 5
});

Images = new FS.Collection("images", { //todo: update 'image' to 'property-image'
  stores: [imageStore]
});


Images.allow({
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