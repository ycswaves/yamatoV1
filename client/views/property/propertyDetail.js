Template.propertyDetail.rendered = function() {
	$('.owl-carousel').owlCarousel({
		navigation : false, // Show next and prev buttons
		slideSpeed : 500,
		paginationSpeed : 400,
		singleItem : true
	});
	initializeMap();
	render();
}

function initializeMap() {
	var address = $('#addressLabel').html()+' Singapore';
	var mrt = $('#mrtLabel').html()+' MRT Singapore';
	convertAddress(address,function(latlng){
		var addressLatlng = latlng;
		if(addressLatlng != null) {
			L.mapbox.accessToken = 'pk.eyJ1IjoiZGF2ZW4wMDkiLCJhIjoiel9vX2hxSSJ9.Ag0_rnoJmLvScwqMR-gjyg';
			var map = L.mapbox.map('mapbox', 'daven009.k1imgjff').setView(addressLatlng, 16);
			L.marker(latlng).addTo(map);
		}
	})
}

function convertAddress(address,callback) {
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var lat = results[0].geometry.location.k;
			var lng = results[0].geometry.location.B;
			callback([lat,lng]);
		} else {
			callback(null);
		}
	});
}

Template.propertyDetail.events({
	'click #enquiry-btn': function(e, t){
		e.preventDefault();
		var referId = $('#enquiry-btn').data('referId');
		Conversations.start(referId,'Property');
	}
})