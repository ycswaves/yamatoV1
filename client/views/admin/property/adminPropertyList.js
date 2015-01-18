var renderSelect = function(){
  $('.selectpicker').selectpicker({
    container:'body',
    style:'btn-white btn-xs'
  });
}

Template.adminPropertyList.rendered = function() {
  render();
  renderSelect();
}

Template.adminPropertyList.helpers({
  propertyStatus: function(){
    renderSelect(); // TODO: hacking, fix if better soln found
    return Config.getAdminPropertyStatus();
  }
});

Template.adminPropertyList.events({
  'change #batchCheck': function(e, t){
    $('.td-check').prop('checked', !!t.find('#batchCheck').checked);
  },

  'change #batchStatus': function(e, t){
    var newStatus = t.find('#batchStatus').value;
    if(newStatus == '') return false;
    var checkedPropIds = t.findAll('input:checkbox.td-check').reduce(function (pre, current) {
          if(current.checked){
            var propId = $(current).parent('td').parent('tr').find('select.individual').attr('id');
            pre.push(propId);
          }
          return pre;
        }, []);
    if(checkedPropIds.length>0){
      console.log(newStatus, checkedPropIds);
      Meteor.call('toggleBatchPropertyStatus', checkedPropIds, newStatus, function(err){
        if(err){
          swal('', '房屋状态更新失败.', 'error');
          return false;
        } else {
          swal('', '房屋状态更新成功!', 'success');
        }
      });
    }
    $('#batchStatus').val('');
    $('#batchStatus').selectpicker('refresh');
  },

  'change select.individual': function(e, t){
    e.preventDefault();
    var propertyId = t.$(e.target).attr('id')
      , status = t.find('#'+propertyId).value;

    Meteor.call('togglePropertyStatus', propertyId, status, function(err){
      if(err){
        swal('', '房屋状态更新失败.', 'error');
        return false;
      } else {
        swal('', '房屋状态更新成功!', 'success');
      }
    });
  },

  'click a.delete': function(e, t){
    e.preventDefault();
    var propertyId = t.$(e.target).data('propid');
    sweetAlert({
      title: "你确定吗?",
      text: "一旦确定将永久删除不能恢复!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "是的，确定删除!",
      closeOnConfirm: false
    }, function(){
      Meteor.call('deleteProperty', propertyId, function(err){
        if(err){
          swal('', '房屋状态更新失败.', 'error');
        } else {
          swal("删除!", "房源ID: "+propertyId+" 已经被删除.", "success");
        }
      });

    });
  }
});