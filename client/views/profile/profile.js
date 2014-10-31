Template.profilePage.rendered = function() {
    render();
    if($('#agentCheck').is(':checked')){
        var isAgent = true;
        $('#agencySelection').removeClass('disabled');
    }else{
        var isAgent = false;
        $('#agencySelection').addClass('disabled');
    }

    $('body').on('ifClicked','#agency-switch',function(event) {
        if(isAgent){
            $('#agencySelection').addClass('disabled');
            isAgent = false;
        }else{
            $('#agencySelection').removeClass('disabled');
            isAgent = true;
        }
    });
}

//Update action
Template.profilePage.events({
  'submit #accountProfile' : function(e, t) {
    e.preventDefault();
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

    console.log(formObj);

    var formObjForValidate = JSON.parse(JSON.stringify(formObj));
    formObjForValidate.userid = 'dummy';
    formObjForValidate.email = {address: 'dummy', verified: false};
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

    //TODO: validation
    var context = UserProfiles.simpleSchema().namedContext('profileForm');
    context.validate(formObjForValidate);
    console.log(formObjForValidate);
    if(!context.isValid()){
      console.log(context);
      CommonHelper.showErrorMessageInForm(context, formErrDivID, t);
    }
    else{
      Meteor.call('editProfile', Meteor.userId(), formObj, function(err){
        if(err){
          NotificationMessages.sendSuccess('账户','用户资料更新失败');
          return false; 
        }
        else{
          NotificationMessages.sendSuccess('账户','用户资料更新成功');
          //Router.go('propertyDetail', {id: propertyid});
        }
      });
    }

    
      
    return false;
  }
})