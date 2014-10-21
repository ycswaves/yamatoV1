Template.myProperties.rendered = function() {
    render();
}

// Template.myProperties.helpers({
//   properties: function(){
//     var res = Properties.find(
//       {author: Meteor.userId()},
//       {_id: 1, address:1, price:1, photos:1, createdAt: 1, sort: {createdAt: -1} }
//     );
//     return res || false;
//   }

//   //TODO: handle no property case
// });

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
      , pageLimit = 6
      , pageNum = 1;

    if(params.page && CommonHelper.isInteger(params.page)){
      pageNum = params.page;
    }

    var totalDocs = Properties.find({author: Meteor.userId()}).count()
      , totalPages = Math.ceil(totalDocs / pageLimit)
      , paginatedDocs = Properties.find(
          {author: Meteor.userId()},
          { _id: 1, address:1, price:1, photos:1, createdAt: 1, sort: {createdAt: -1},
            skip: (pageNum-1)*pageLimit, limit: pageLimit }
        );

    return {
      properties: paginatedDocs,
      totalDocs: totalDocs,
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