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

  editProperty: function(propID, formObj){
    var user = Meteor.user();
    if(!user){
      throw new Meteor.Error(401, "You need to login to edit");
    }
    Properties.update({_id: propID}, {$set: formObj});
  },

  deletePropertyImgs: function(imgArr){
    PropertyImages.remove({_id: {$in: imgArr}});
  }
});