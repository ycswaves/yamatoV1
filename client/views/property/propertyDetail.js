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
	$(".infoPanel").pin({containerSelector: ".infoArea",padding: {top: 100}});
}

function initializeMap() {
	var latitude = $('input[name="latitude"]').val() || null
    , longitude = $('input[name="longitude"]').val() || null
	if(latitude != '' && longitude != '') {
		L.mapbox.accessToken = 'pk.eyJ1IjoiZGF2ZW4wMDkiLCJhIjoiel9vX2hxSSJ9.Ag0_rnoJmLvScwqMR-gjyg';
    addressLatlng = [parseFloat(latitude), parseFloat(longitude)];
		var map = L.mapbox.map('mapbox', 'daven009.k1imgjff').setView(addressLatlng, 16);
		map.scrollWheelZoom.disable();
		L.marker(addressLatlng).addTo(map);
	}
}

Template.propertyDetail.events({
	'click #enquiry-btn': function(e, t){
		e.preventDefault();
		var referId = $('#enquiry-btn').data('referId');
		Conversations.start(referId,'Property');
	},
	'click #return-btn': function(e,t){
		Router.go(Session.get('prevPath') || 'landing');
	}
})