CommonHelper = {
  'isInteger': function(n){
    n = parseInt(n);
    return n === +n && n === (n|0);
  },

  'isEmptyString': function(n){
    return '' === n;
  },

  'showErrorMessageInForm': function(context, formErrDivID, template){
    context.invalidKeys().forEach(function(e){
      var errMsg = context.keyErrorMessage(e.name)
      , targetDiv = formErrDivID[e.name];
      template.$(targetDiv).append('<span style="color: red" class="help-block"><i class="fa fa-exclamation-triangle"></i> '+errMsg+'</span>');
      template.$(targetDiv).find('input').focus();
    });
  },

  'convertAddressAsync': function(address,callback){
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.k;
        var lng = results[0].geometry.location.B;
        callback(null, {latitude: lat,longitude: lng});
      } else {
        callback('not able to get geo-location', null);
      }
    });
  },

  'popupWindow': function(url, title, w, h) {
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  },

  'lockForm': function(template){
    template.$('button, select, input, textarea').attr('disabled','disabled');
    template.$('button[type="submit"]').append('<i style="margin-left:5px" class="fa fa-spinner fa-spin"></i>')
  },

  'unlockForm': function(template){
    template.$('button, select, input, textarea').removeAttr('disabled');
    template.$('i', 'button[type="submit"]').remove();
  },

  'countDown' : function(placeholder,seconds) {
    var sessionName = 'Countdown.'+placeholder;
    // Session.set(sessionName,time());
    Meteor.setTimeout(function() {
      Meteor.call("sendVerificationEmail",user._id);
    }, seconds * 1000);
  }
}