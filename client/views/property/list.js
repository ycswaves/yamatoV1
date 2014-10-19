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
      , pageNum = 1;

    if(params.page && CommonHelper.isInteger(params.page)){
      pageNum = params.page;
    }

    var filter = {}
      , queryArr = []; // to pass in footer later
    for(var key in params){
      if(key == 'page' || !params[key]) continue;

      if(key == 'price'){
        filter[key] = {$gte: parseInt(params[key], 10)};
      } else {
        filter[key] = params[key];
      }
      queryArr.push(key+'='+params[key]);
    }
    console.log(filter);

    var totalDocs = Properties.find(filter, {sort: {createdAt: -1}}).count() //filter apply here too
      , totalPages = Math.ceil(totalDocs / pageLimit)
      , paginatedDocs = Properties.find(
          filter,
          {sort: {createdAt: -1}, skip: (pageNum-1)*pageLimit, limit: pageLimit}
        );


    // if(pageNum > totalPages){ //TODO: sometimes flash 'not found' even though have data
    //   this.render('notFound');
    //   return;
    // }

    return {
      properties: paginatedDocs,
      totalDocs: totalDocs,
      paginationConfig: {
        'config': {
          pageNum: pageNum,
          pageLimit: pageLimit,
          windowSize: 5, // asa # of pages displayed in the pagination must be odd number
          totalDocs: totalDocs,
          routeName: 'properties',
          query: queryArr.join('&')
        }
      }
    }
  }
});
