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

  'convertAddressAsync': function(postcode,callback){
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': 'Singapore '+postcode }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var lat = results[0].geometry.location.k;
        var lng = results[0].geometry.location.D;
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

  //unit can be years, months, days, hours, seconds
  'setCountDown' : function(placeholder,number) {
    if (typeof timer != 'undefined') {
      Meteor.clearInterval(timer);
    }
    var sessionName = 'Countdown.'+placeholder;
    var future = moment().add(number,'seconds').format('YYYY-MM-DD HH:mm:ss');
    //预设timer起始时间，修复过一秒才开始的bug
    Session.set(sessionName,moment(future).fromNow());
    timer = Meteor.setInterval(function() {
      if (moment().diff(future, 'seconds')>=0) {
        Session.set(sessionName,false);
        Meteor.clearInterval(timer);
      }
      else {
        Session.set(sessionName,moment(future).fromNow());
      }
    },1000);
  },

  'getCountDown' : function(placeholder) {
    if (typeof Session.get('Countdown.'+placeholder) != 'undefined') {
      return Session.get('Countdown.'+placeholder);
    }
    else {
      return false;
    }
  },

  'checkCurrentUserStatus' : function(){
    var user = Meteor.user();
    if (user) {
      if (typeof user.status === 'undefined') {
        return 'active';
      }
      return user.status;
    }
    else {
      return false;
    }
  },

  'getEmailAndStatusByUserId' : function(userId){
    var loggedInUser = Meteor.users.findOne({_id:userId});
    if (typeof loggedInUser != "undefined") {
      if(loggedInUser.services){
        var service = loggedInUser.services;
        if(service.google){
          return {address:service.google.email, verified:true};
        }
        else if (service.facebook){
          return {address:service.facebook.email, verified:true};
        }
      }
      if(loggedInUser.emails){
        return loggedInUser.emails[0];
      }
    }
  }
}