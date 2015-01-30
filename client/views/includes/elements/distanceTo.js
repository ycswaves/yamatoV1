Template.distanceTo.helpers({
  hasMultiAddr: function(){
    var multiAddress = Session.get('multiAddress');
    return !$.isEmptyObject(multiAddress);
  }
});
