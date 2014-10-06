Template.propertyListing.rendered = function() {
    render();
}

var isInteger = function(n){
  return n === +n && n === (n|0);
}

ListController = RouteController.extend({
  template: 'propertyListing',
  waitOn: function () {
    console.log(this.params);
    return Meteor.subscribe("properties");
  },

  action: function () {
    this.render();
  },
  data: function () {
    var params = this.params
      , pageLimit = 8
      , pageNum = 1
      , filter = {}
      , result = {};
    // if(params.id){ //TODO: testing get query from URL
    //   filter._id = params.id;
    // }

    if(params.page && isInteger(params.page)){
      pageNum = params.page;
    }
    return {
      properties: Properties.find({}, {sort: {createdAt: -1}, limit: pageLimit})
    }
  }
});
