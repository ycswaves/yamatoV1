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
	$(".infoPanel").pin({containerSelector: ".infoArea",padding: {top: 112}});
}

function initializeMap() {
	var latitude = $('input[name="latitude"]').val() || null
    , longitude = $('input[name="longitude"]').val() || null

	if(latitude && longitude) {
		L.mapbox.accessToken = 'pk.eyJ1IjoiZGF2ZW4wMDkiLCJhIjoiel9vX2hxSSJ9.Ag0_rnoJmLvScwqMR-gjyg';
    addressLatlng = [parseFloat(latitude), parseFloat(longitude)];
		var map = L.mapbox.map('mapbox', 'daven009.k1imgjff').setView(addressLatlng, 16);
		map.scrollWheelZoom.disable();
		L.marker(addressLatlng).addTo(map);
	} else {
    $('#mapbox').hide();
  }
}

Template.propertyDetail.events({
	'click #enquiry-btn': function(e, t){
		e.preventDefault();
		var referId = $('#enquiry-btn').data('referId');
		Conversations.start(referId,'Property');
		// 等待meteor建立对话
    Meteor.setTimeout(function() {
    	if (typeof Session.get('Conversation.currentTopicId') != 'undefined') {
    		var topicId = Session.get('Conversation.currentTopicId');
	      $('button[data-topic-id='+topicId+']').parent().find('.topicAvatar').click();
	      delete Session.keys['Conversation.currentTopicId'];
	    }
    }, 2 * 1000);
	},
	'click #return-btn': function(e,t){
		Router.go(Session.get('prevPath') || 'landing');
	}
})