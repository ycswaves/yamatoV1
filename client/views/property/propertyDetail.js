Template.propertyDetail.rendered = function() {
	$('.owl-carousel').owlCarousel({
		navigation : false, // Show next and prev buttons
		slideSpeed : 500,
		paginationSpeed : 400,
		singleItem : true
	});
	document.title = '房屋详情 | ' + $('#addressLabel').text();
	window.scrollTo(0, 0); //scroll back to top after editing
	initializeMap();
	render();
	//pin it
	$(".panel").pin({containerSelector: ".infoArea",padding: {top: 100}});
}

function initializeMap() {
	var address = $('#addressLabel').html()+' Singapore';
	var mrt = $('#mrtLabel').html()+' MRT Singapore';
	convertAddress(address,function(err,latlng){
		var addressLatlng = latlng;
		if(err == null) {
			L.mapbox.accessToken = 'pk.eyJ1IjoiZGF2ZW4wMDkiLCJhIjoiel9vX2hxSSJ9.Ag0_rnoJmLvScwqMR-gjyg';
			var map = L.mapbox.map('mapbox', 'daven009.k1imgjff').setView(addressLatlng, 16);
			map.scrollWheelZoom.disable();
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
			callback(null,[lat,lng]);
		} else {
			callback('无法分析当前地址',null);
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