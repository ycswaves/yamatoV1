Template.salesListing.rendered = function() {
  render();
}

SalesListController = RouteController.extend({
  template: 'salesListing'
  // waitOn: function () {
  //   return Meteor.subscribe("properties");
  // },

  // action: function () {
  //   if (this.ready()){
  //     this.render();
  //   } else{
  //     this.render('loading');
  //   }
  // },
  // data: function () {
  //   var params = this.params
  //     , pageLimit = 8
  //     , pageNum = 1;

  //   if(params.page && CommonHelper.isInteger(params.page)){
  //     pageNum = params.page;
  //   }


  //   var filter = {status: 'open'}
  //     , query = params.query
  //     , queryArr = []; // to pass in footer later

  //   for(var key in query){
  //     switch(key){
  //       case 'price':
  //         filter[key] = {$lte: parseInt(query[key], 10)};
  //         break;

  //       case 'mrtLines':
  //         if(!query['mrt']){
  //           filter['mrt'] = new RegExp(query[key]);
  //         }
  //         break;

  //       case 'rentType':
  //       case 'hasAgentFee':
  //         filter[key] = parseInt(query[key], 10);
  //         break;

  //       case 'roomType':
  //         filter['rentType'] = {$not: 1};

  //       default:
  //         filter[key] = query[key];
  //         break;
  //     }
  //     queryArr.push(key+'='+query[key]); //later revert the query back to string
  //   }
  //   var totalDocs = Properties.find(filter).count() //filter apply here too
  //     , totalPages = Math.ceil(totalDocs / pageLimit)
  //     , paginatedDocs = Properties.find(
  //         filter,
  //         {sort: {createdAt: -1}, skip: (pageNum-1)*pageLimit, limit: pageLimit}
  //       );


  //   // if(pageNum > totalPages){ //TODO: sometimes flash 'not found' even though have data
  //   //   this.render('notFound');
  //   //   return;
  //   // }
  //   //record lastest url
  //   Session.set('prevPath', Router.current().url);
  //   return {
  //     properties: paginatedDocs,
  //     totalDocs: totalDocs,
  //     paginationConfig: {
  //       'config': {
  //         pageNum: pageNum,
  //         pageLimit: pageLimit,
  //         windowSize: 5, // asa # of pages displayed in the pagination must be odd number
  //         totalDocs: totalDocs,
  //         routeName: 'properties',
  //         query: queryArr.join('&')
  //       }
  //     }
  //   }
  // }
});