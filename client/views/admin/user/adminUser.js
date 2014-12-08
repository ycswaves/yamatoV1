Template.adminUser.rendered = function() {
  render();
}

AdminUsersController = RouteController.extend({
  template: 'adminUser',
  waitOn: function () {
    return Meteor.subscribe("userData");
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
      , statusType = params.type || 'active'
      , pageLimit = 6
      , pageNum = 1;

    var queryFilter = {
      status: {$nin:['blocked']}
    };

    if(params.page && CommonHelper.isInteger(params.page)){
      pageNum = params.page;
    }

    if(statusType){
      switch(statusType){
        case 'all':
          queryFilter = {}
          break;
        case 'blocked':
          queryFilter.status = {$in:['blocked']};
          break;
      }
    }

    var totalDocs = Meteor.users.find(queryFilter).count()
      , totalPages = Math.ceil(totalDocs / pageLimit)
      , paginatedDocs = Meteor.users.find(
                          queryFilter,
                          { _id: 1, createdAt: 1, sort: {createdAt: -1},
                            skip: (pageNum-1)*pageLimit, limit: pageLimit }
                        )

      , statusCount = Meteor.users.find({},{status: 1}).fetch();

      var statusCountMapping = {};
      for(var i=0; i<statusCount.length; i++){
        var sts = statusCount[i].status;
        if(statusCountMapping[sts] == undefined){
          statusCountMapping[sts] = 1;
        } else {
          statusCountMapping[sts]++;
        }
      }
    return {
      users: paginatedDocs,
      totalDocs: totalDocs,
      paginationConfig: {
        'config': {
          pageNum: pageNum,
          pageLimit: pageLimit,
          windowSize: 5, // asa # of pages displayed in the pagination must be odd number
          totalDocs: totalDocs,
          routeName: 'adminuser',
          routeParam: {type: statusType}
        }
      }
    }

  }
});