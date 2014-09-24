Meteor.methods({
  addProperty: function(formObj){
  	var user = Meteor.user();
  	if(!user){
  	  throw new Meteor.Error(401, "You need to login to post");
  	}
  	var propertyId = Properties.insert(formObj, function(err, res) {
      if(err){
        console.log(err); // need to log to see if any attack or form validation not cover enough
        return false;
      }
    });

    return propertyId;
  },

  // uploadImage: function(propID, imageFiles){
  //   var user = Meteor.user()
  //     , imageIDs = [];

  //   if(!user){
  //     throw new Meteor.Error(401, "You need to login to upload image");
  //   }
  //   else{
  //     imageFiles.forEach(function(file){
  //       // Images.insert will return file object of inserted image
  //       var file = Images.insert(file, function(err, res){
  //         if(err){
  //           console.log(err);
  //           return false
  //         }
  //         imageIDs.push(file._id);
  //       });
  //     });

  //     Properties.update(
  //       {_id: propID},
  //       {$addToSet: {photos: {$each: imageIDs}}}
  //     );
  //   }
  // }
});