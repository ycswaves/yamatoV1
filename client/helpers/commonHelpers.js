CommonHelper = {
  'isInteger': function(n){
    n = parseInt(n);
    return n === +n && n === (n|0);
  },

  'isEmptyString': function(n){
    return '' === n.trim();
  },

  'showErrorMessageInForm': function(context, formErrDivID, template){
    context.invalidKeys().forEach(function(e){
      var errMsg = context.keyErrorMessage(e.name)
      , targetDiv = formErrDivID[e.name];
      template.$(targetDiv).append('<span style="color: red" class="help-block"><i class="fa fa-exclamation-circle"></i> '+errMsg+'</span>');
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
    template.$('button[type="submit"]>i[class="fa fa-spinner fa-spin"]').remove();
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
  },

  'checkMultiAddrLimit': function(inputDom, limit){
    var addresses = Session.get('multiAddress')
      , addrCount = 0;

    for(var key in addresses){
      addrCount++;
    }

    if(addrCount >= 6){
      $(inputDom).prop('disabled', true);
    } else {
      $(inputDom).prop('disabled', false);
    }
  },

  'initPillboxAutoCompl': function(domId, inputDom){
    var autoCompl = new GoogleAutoComplete();

    autoCompl.init(domId, function(place){
      var userType = $(inputDom).val()
          google_address = place.formatted_address
        , locObj = {};

      locObj.address = userType;

      var postcodeFound = google_address.match(/singapore (\d{6})/i);
      if(postcodeFound && postcodeFound.length>1){
        locObj.postcode = postcodeFound[1];
      }
      if(place.geometry.location){
        var lat = place.geometry.location.k
          , lng = place.geometry.location.D;

        locObj.geometry = {
          latitude: lat,
          longitude: lng
        };
      }

      var existingAddr = Session.get('multiAddress');
      if(existingAddr){
        existingAddr[locObj.address] = locObj;
        Session.set('multiAddress', existingAddr);
      } else {
        var obj = {};
        obj[userType] = locObj;
        Session.set('multiAddress', obj);
      }

      // to limit no of multiple address to 6
      CommonHelper.checkMultiAddrLimit(inputDom, 6);
      $(inputDom).val('');
    });
  }
}