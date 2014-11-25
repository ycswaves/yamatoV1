Template.myProperties.rendered = function() {
  render();
}

MyPropertiesController = RouteController.extend({
  template: 'myProperties',
  waitOn: function () {
	  return (Meteor.subscribe('userData') && Meteor.subscribe("myProperty", Meteor.userId()));
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
      , hash = params.hash
      , pageLimit = 6
      , pageNum = 1
      , showActive = true
      , visibleTbl = 'active-record';


    var queryFilter = {
      author: Meteor.userId(),
      status: 'open'
    };

    if(params.page && CommonHelper.isInteger(params.page)){
      pageNum = params.page;
    }

    if(hash == 'inactive-record'){
      queryFilter.status ={$ne:'open'};
      showActive = false;
    }

    var totalDocs = Properties.find(queryFilter).count()
      , totalPages = Math.ceil(totalDocs / pageLimit)
      , paginatedDocs = Properties.find(
          queryFilter,
          { _id: 1, address:1, price:1, photos:1, createdAt: 1, sort: {createdAt: -1},
            skip: (pageNum-1)*pageLimit, limit: pageLimit }
        );

    return {
      properties: paginatedDocs,
      totalActive: Properties.find({author: Meteor.userId(), status: 'open'}).count(),
      totalInactive: Properties.find({author: Meteor.userId(), status: {$ne:'open'}}).count(),
      totalDocs: totalDocs,
      showActive: showActive,
      paginationConfig: {
        'config': {
          pageNum: pageNum,
          pageLimit: pageLimit,
          windowSize: 5, // asa # of pages displayed in the pagination must be odd number
          totalDocs: totalDocs,
          routeName: 'myproperty'
        }
      }
    }
  }
});