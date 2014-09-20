Template.propertyListing.rendered = function() {
    render();
}

ListController = RouteController.extend({
  template: 'propertyListing',
  action: function () {
    this.render();
  },
  data: function () {
    var params = this.params;
    if(params.id){ //TODO: testing get query from URL
      return {
        properties: Properties.find({_id: params.id})
      }
    }
    return {
      properties: Properties.find({}, {sort: {createdAt: -1}, limit: 5})
    }
  }
});