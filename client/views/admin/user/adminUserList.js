var renderSelect = function(){
  $('.selectpicker').selectpicker({
    container:'body',
    style:'btn-white btn-xs'
  });
}

Template.adminUserList.rendered = function() {
  render();
  renderSelect();
}

Template.adminUserList.helpers({
  userStatus: function(){
    renderSelect(); // TODO: hacking, fix if better soln found
    return Config.getAdminUserStatus();
  }
});

Template.adminUserList.events({
  'change select.status': function(e, t){
    e.preventDefault();
    var userId = t.$(e.target).attr('id')
      , status = t.find('#'+userId).value;

    Meteor.call('toggleUserStatus', userId, status, function(err){
      if(err){
        swal('', '用户状态更新失败.', 'error');
        return false;
      } else {
        swal('', '用户状态更新成功!', 'success');
      }
    });
  },

  'click a.delete': function(e, t){
    e.preventDefault();
    var userId = t.$(e.target).data('propid');
    sweetAlert({
      title: "你确定吗?",
      text: "一旦确定将永久删除不能恢复!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "是的，确定删除!",
      closeOnConfirm: false
    }, function(){
      Meteor.call('deleteUser', userId, function(err){
        if(err){
          swal('', '用户状态更新失败.', 'error');
        } else {
          swal("删除!", "用户ID: "+userId+" 已经被删除.", "success");
        }
      });

    });
  }
});