Template.propertyListing.rendered = function() {
    render();
}

var isInteger = function(n){
  n = parseInt(n);
  return n === +n && n === (n|0);
}

ListController = RouteController.extend({
  template: 'propertyListing',
  waitOn: function () {
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
    console.log('pageNum: '+pageNum, 'query: '+params.query);
    return {
      properties: Properties.find({}, {sort: {createdAt: -1}, skip: (pageNum-1)*pageLimit, limit: pageLimit})
    }
  }
});
