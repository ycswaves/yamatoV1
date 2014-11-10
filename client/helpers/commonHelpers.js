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
	}
}