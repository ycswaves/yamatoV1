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

  'convertAddress': function(address,callback){
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
  }


}