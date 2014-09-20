Template.landingPage.rendered = function() {
    render();
}

Template.landingPage.helpers({
  district: function(){
  	return Config.getDistrict();
  }
})
