var validateUser = function(){
  var user = Meteor.user();
  if(!user){
    throw new Meteor.Error(401, "You need to login to post");
  }
};

var toggleStatus = function(propID, sts){
  validateUser();
  Properties.update(
    {_id: propID, author: Meteor.userId()},
    { $set: {status: sts} }
  );
}

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

  closeProperty: function(propID){
    toggleStatus(propID, 'closed');
  },

  reopenProperty: function(propID){
    toggleStatus(propID, 'open');
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
    Properties.remove({_id: propID, author: Meteor.userId()});
  },

  deletePropertyImgs: function(imgArr){
    validateUser();
    PropertyImages.remove({_id: {$in: imgArr}});
  }
});
