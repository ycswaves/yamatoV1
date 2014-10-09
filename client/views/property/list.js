Template.propertyListing.rendered = function() {
    render();
}

ListController = RouteController.extend({
  template: 'propertyListing',
  waitOn: function () {
    return Meteor.subscribe("properties");
  },

  action: function () {
    if (this.ready()){
      this.render();
    }
    else{
      this.render('loading');
    }
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
    if(params.page && CommonHelper.isInteger(params.page)){
      pageNum = params.page;
    }
    console.log('pageNum: '+pageNum, 'query: '+params.query);
    return {
      properties: Properties.find({}, {sort: {createdAt: -1}, skip: (pageNum-1)*pageLimit, limit: pageLimit})
    }
  }
});
