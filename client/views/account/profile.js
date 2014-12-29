Template.profile.rendered = function() {
  render();
}

Template.profile.helpers({
  profile:function(){
    return UserProfiles.findOne({userid: Meteor.userId()}
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
  },
  'submit #accountProfile' : function(e, t) {
    e.preventDefault();
    CommonHelper.lockForm(t);
    t.$('span.help-block').remove(); //clear all error msg

    var name = t.find('input[name=name]').value
      , phone = t.find('input[name=phone]').value
      , qq = t.find('input[name=qq]').value
      , wechat = t.find('input[name=wechat]').value
      , about = t.find('textarea[name=about]').value;

    var formObj = {
      "name": CommonHelper.isEmptyString(name)? null : name,
      "phone": CommonHelper.isEmptyString(phone)? null : phone,
      "qq": CommonHelper.isEmptyString(qq)? null : qq,
      "wechat": CommonHelper.isEmptyString(wechat)? null : wechat,
      "about" : CommonHelper.isEmptyString(about)? null : about
    };

    /* formObjForValidate is for validation only, must insert some
       dummy data to non-updatable fields to pass the validation
    */
    var formObjForValidate = JSON.parse(JSON.stringify(formObj));
    formObjForValidate.userid = 'dummy';
    formObjForValidate.privilege = 0;


    /*************************************************
        Map div id to schema, so as to attach
        error message in correspondant form-group
        key: schema attribute,
        value: form-group div ID Selector(include '#')
    **************************************************/
    var formErrDivID = {
      //name: can be empty
      "phone": "#phone-form-group",
      "qq": '#qq-form-group',
      "wechat": '#wechat-form-group'
      //about can be empty
    };

    var context = UserProfiles.simpleSchema().namedContext('profileForm');
    context.validate(formObjForValidate);
    if(!context.isValid()){
      CommonHelper.unlockForm(t);
      CommonHelper.showErrorMessageInForm(context, formErrDivID, t);
    }
    else{
      console.log(formObj);
      Meteor.call('editProfile', Meteor.userId(), formObj, function(err){
        if(err){
          swal('', '用户资料更新失败.', 'error');
          return false;
        }
        else{
          swal('', '用户资料更新成功!', 'success');
          //Router.go('propertyDetail', {id: propertyid});
        }
        CommonHelper.unlockForm(t);
      });
    }
    return false;
  }
})