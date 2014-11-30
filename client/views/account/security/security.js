function isNotEmpty(val) {
  // if null or empty, return false
  if (!val || val === ''){
    FlashMessages.clear();
    FlashMessages.sendError("请填写所有必须填写的栏目");
    return false;
  }
  return true;
}

function isSame(val1,val2) {
  // if not the same the passwords
  if(val1 !== val2 ){
    FlashMessages.clear();
    FlashMessages.sendError("重复输入密码不同");
    return false;
  }
  return true;
}

function isValidPassword(val) {
  if (val.length >= 6) {
    return true;
  } else {
    FlashMessages.clear();
    FlashMessages.sendError("请输入六位以上的密码");
    return false;
  }
}

//Login action
Template.securityPage.events({
  //Normal login
  'submit #accountSecurity' : function(e, t) {
    e.preventDefault();
    var oldpass = t.find('input[name=oldpass]').value
      , newpass = t.find('input[name=newpass]').value
      , repeatpass = t.find('input[name=repeatpass]').value;

    if (isNotEmpty(oldpass) && isNotEmpty(newpass) && isNotEmpty(repeatpass)
        && isValidPassword(newpass)){
      if (isSame(newpass,repeatpass)) {
        Accounts.changePassword(oldpass, newpass, function(err){
          if (typeof err == 'undefined') {
            swal('修改密码', '密码修改成功', 'success');
          }
          else {
            swal('修改密码', '密码修改失败', 'error');
          }
        })
      }
    }
    return false;
  }
})