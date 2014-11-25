Template.myPropertyList.rendered = function() {
  render();
}

Template.myPropertyList.helpers({
  propertyStatus: function(){
    $('select').selectpicker(); // TODO: hacking, fix if better soln found
    return Config.getAllPropertyStatus();
  }
});

Template.myPropertyList.events({
  'change select.status': function(e, t){
    e.preventDefault();
    var propertyId = t.$(e.target).attr('id')
      , status = t.find('#'+propertyId).value;

    Meteor.call('togglePropertyStatus', propertyId, status, function(err){
      if(err){
        NotificationMessages.sendError('我的房屋','房屋状态更新失败');
        return false;
      } else {
        NotificationMessages.sendSuccess('我的房屋','房屋状态更新成功');
      }
    });
  }
});