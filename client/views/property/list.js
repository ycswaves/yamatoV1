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
      , windowSize = 5 // must be odd number
      , midIndex = parseInt(windowSize / 2)
      , filter = {}
      , result = {};
    // if(params.id){ //TODO: testing get query from URL
    //   filter._id = params.id;
    // }
    if(params.page && CommonHelper.isInteger(params.page)){
      pageNum = params.page;
    }
    console.log('pageNum: '+pageNum, 'query: '+params.query);

    var dbQuery = Properties.find({}, {sort: {createdAt: -1} }) //filter apply here too
      , totalDocs = dbQuery.count()
      , paginatedDocs = Properties.find({}, {sort: {createdAt: -1}, skip: (pageNum-1)*pageLimit, limit: pageLimit})
      , startPage = (pageNum <= midIndex)? 1 : (pageNum - midIndex);

    var pageNumberArr = Array.apply(null, Array(windowSize))
                      .map(function (e, i) {
                        var res = i+startPage;
                        if(res > totalDocs) return false; // don't exceed page limit
                        return res;
                      });

    return {
      properties: paginatedDocs,
      totalDocs: totalDocs,
      paginations: pageNumberArr,
      currentPage: pageNum
    }
  }
});
