Template.propertyDetail.rendered = function() {
  $('.owl-carousel').owlCarousel({
    navigation : false, // Show next and prev buttons
    slideSpeed : 500,
    paginationSpeed : 400,
    singleItem : true
  });
  render();
}

Template.propertyDetail.events({
	'click #enquiry-btn': function(e, t){
		e.preventDefault();
		var referId = $('#enquiry-btn').data('referId');
		Conversations.start(referId,'Property');
	}
})