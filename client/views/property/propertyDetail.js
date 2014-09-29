Template.propertyDetail.rendered = function() {
  $('.owl-carousel').owlCarousel({
    navigation : false, // Show next and prev buttons
    slideSpeed : 500,
    paginationSpeed : 400,
    singleItem : true
  });
  render();
}