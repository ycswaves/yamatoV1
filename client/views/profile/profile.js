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
    var name = t.find('input[name=name]').value
      , phone = t.find('input[name=phone]').value
      , qq = t.find('input[name=qq]').value
      , wechat = t.find('input[name=wechat]').value
      , about = t.find('textarea[name=about]').value;

    var formObj = {
      "name": name, 
      "phone": phone,
      "qq": qq,
      "wechat": wechat,
      "about" : about
    }  

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
    context.validate(formObj);
    if(!context.isValid()){
      var isFocused = false;
      context.invalidKeys().forEach(function(e){
        var errMsg = context.keyErrorMessage(e.name)
          , targetDiv = formErrDivID[e.name];
        t.$(targetDiv).append('<span style="color: red" class="help-block"><i class="fa fa-exclamation-triangle"></i> '+errMsg+'</span>');
        if(!isFocused){
          t.$(targetDiv).find('input').focus();
        }
      });
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