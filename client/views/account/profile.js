Template.profile.rendered = function() {
  render();
  $('body').off('blur','.editable').on('blur','.editable',function(e){
    var DOM = $(this);
    var field = $(this).attr('name');
    var value = $(this).val();
    var formObj = {};
    formObj[field] = value;
    if (!CommonHelper.isEmptyString(value)) {
      Meteor.call('editProfile', Meteor.userId(), formObj, function(err){
        if(err){
          DOM.addClass('text-danger');
          return false;
        }
      });
    }
  })

  $('body').off('focus','.editable').on('focus','.editable',function(){
    $(this).removeClass('text-danger');
  })
}

Template.profile.helpers({
  profile:function(){
    return UserProfiles.findOne({userid: Meteor.userId()});
  },
  countDown:function(){
    return CommonHelper.getCountDown('EmailCountDown');
  }
})

//Update action
Template.profile.events({
  'click #verifyEmail' : function(e, t){
    Meteor.call("sendVerificationEmail",Meteor.userId());
    CommonHelper.setCountDown('EmailCountDown',45);
    swal('发送邮件', '验证邮件发送成功，请查收', 'success');
  }
})