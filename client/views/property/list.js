Template.propertyListing.rendered = function() {
  render();
}

Template.propertyListing.events({
  'click li.pageLink': function(){
    window.scrollTo(0, 0);
  }
});  

ListController = RouteController.extend({
  template: 'propertyListing',
  waitOn: function () {
    return Meteor.subscribe("properties");
  },

  action: function () {
    if (this.ready()){
      this.render();
    } else{
      this.render('loading');
    }
  },
  data: function () {
    var params = this.params
      , pageLimit = 8
      , pageNum = 1
      , filter = {};
    // if(params.id){ //TODO: testing get query from URL
    //   filter._id = params.id;
    // }
    if(params.page && CommonHelper.isInteger(params.page)){
      pageNum = params.page;
    }

    var totalDocs = Properties.find({}, {sort: {createdAt: -1} }).count() //filter apply here too
      , totalPages = Math.ceil(totalDocs / pageLimit)
      , paginatedDocs = Properties.find(
          {}, 
          {sort: {createdAt: -1}, skip: (pageNum-1)*pageLimit, limit: pageLimit}
        );


    if(pageNum > totalPages){ //TODO: sometimes flash 'not found' even though have data
      this.render('notFound');
      return;
    }  

    return {
      properties: paginatedDocs,
      totalDocs: totalDocs,
      paginationConfig: {
        'config': {
          pageNum: pageNum,
          pageLimit: pageLimit,
          windowSize: 5, // asa # of pages displayed in the pagination must be odd number
          totalDocs: totalDocs,
          routeName: 'properties'
        }
      }
    }
  }
});
