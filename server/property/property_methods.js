var validateUser = function(){
  var user = Meteor.user();
  if(!user){
    throw new Meteor.Error(401, "You need to login to perform this action");
  }
};

Meteor.methods({
  addProperty: function(formObj){
  	validateUser();
  	var propertyId = Properties.insert(formObj, function(err) {
      if(err){
        console.log(err); // need to log to see if any attack or form validation not cover enough
        return false;
      }
    });

    return propertyId;
  },

  editProperty: function(propID, formObj){
    validateUser();
    Properties.update(
      {_id: propID, author: Meteor.userId()},
      {$set: formObj}
    );
  },

  togglePropertyStatus: function(propID, sts){
    validateUser();
    filter = (Meteor.user().isAdmin)?
        {_id: propID} : {_id: propID, author: Meteor.userId()}
    Properties.update(
      filter,
      { $set: {status: sts} }
    );
  },

  incPropertyView: function(propID){
    var authorId = Meteor.userId() || null;
    Properties.update(
      {_id: propID, author: {$ne: authorId} },
      {$inc: { views: 1 }}
    );
  },

  deleteProperty: function(propID){
    validateUser();

    filter = (Meteor.user().isAdmin)?
        {_id: propID} : {_id: propID, author: Meteor.userId()}
    var prop = Properties.findOne(filter, {photos: 1});

    //Also remember to delete all the photos in the post
    PropertyImages.remove({_id: {$in: prop.photos}});
    Properties.remove(filter);
  },

  deletePropertyImgs: function(imgArr){
    validateUser();
    PropertyImages.remove({_id: {$in: imgArr}});
  },

  saveNearby: function(propId, category, dataArr){
    var set = {};
    set[category] = dataArr;
    NearbyCollection.update(
      {propertyId: propId},
      {$set: set},
      {upsert: true}
    );
  }
});
