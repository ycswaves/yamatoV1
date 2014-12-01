Template.landingPage.rendered = function() {
  render();
  if (Session.get('resetPassword')) {
    $('#resetPassModal').modal('show');
  }
  ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));
}

Template.landingPage.events({
  'change #mrtlines': function(e, t){
    e.preventDefault();
    var mrtLine = t.find('select[name="mrtlines"]').value;
    ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLine));
    Deps.flush();
    t.$('#stations').selectpicker('refresh');
  },

  'change #rent-type': function(e, t){
    e.preventDefault();
    var rentType = t.find('select[name="rent-type"]').value;
    if(rentType == 1){
      t.$('#room-type').parent().hide();
    }
    else{
      t.$('#room-type').parent().show();
    }
  },

  'submit #search-form-landing': function(e, t){
    e.preventDefault();

    /*********************************************
        Retrieve form data
        *********************************************/
        var price = t.find('select[name="price"]').value || null
        , district = t.find('select[name="district"]').value || null
        , pType = t.find('select[name="property-type"]').value || null
        , mrtLines = t.find('select[name="mrtlines"]').value || null
        , nearestMRT = t.find('select[name="stations"]').value || null;

    /*********************************************
        Map form data to schema
        *********************************************/
        var filter = {
          price: price,
          district: district,
          propertyType: pType,
          mrtLines: mrtLines,
          mrt: nearestMRT
        };

        var queryArr = [];
        for (var key in filter){
          if(filter[key] != null){
            queryArr.push(key+'='+filter[key]);
          }
        }

        Router.go('properties', {page: 1}, {query: queryArr.join('&')});
      }
    });



Template.landingPage.helpers({
  district: function(){
    return Config.getDistrict();
  },

  mrtlines: function(){
    return Config.getMRT();
  },

  stations: function(){
    return ReactiveDS.get('mrtline');
  },

  ptypes: function(){
    return Config.getPropertyTypes();
  },

  priceRange: function(){
    return Config.getPriceRange();
  }
});

//验证邮箱
Template.landingPage.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          swal('验证邮箱', '对不起，验证链接已失效...', 'error');
        }
      } else {
        swal('验证邮箱', '欢迎回来，已成功验证邮箱!', 'success');
      }
    });
  };
  if (Accounts._resetPasswordToken) {
    Session.set('resetPassword',Accounts._resetPasswordToken);
  }
};
