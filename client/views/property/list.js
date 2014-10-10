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
    } else{
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

    var dbQuery = Properties.find({}, {sort: {createdAt: -1} }) //filter apply here too
      , totalDocs = dbQuery.count()
      , totalPages = Math.ceil(totalDocs / pageLimit);

    if(pageNum > totalPages){
      this.render('notFound');
      return;
    }  
  
    var paginatedDocs = Properties.find({}, {sort: {createdAt: -1}, skip: (pageNum-1)*pageLimit, limit: pageLimit})
      , startPage = (pageNum <= midIndex)? 1 : (pageNum - midIndex);

    var pageNumberArr = [];  
    for(var i=0; i<windowSize; i++){
      var pNum = i+startPage;
      if(pNum > totalPages) break;
      pageNumberArr.push(pNum);  
    }  

    return {
      properties: paginatedDocs,
      totalDocs: totalDocs,
      paginations: pageNumberArr,
      currentPage: pageNum
    }
  }
});
