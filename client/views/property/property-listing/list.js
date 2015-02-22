Template.propertyListing.rendered = function() {
  render();
}

Template.propertyListing.events({
  'change select[name="sorting"]': function(e, t){
    e.preventDefault();
    t.find('button').blur(); //need to force to blur
    var sortby = t.find('select[name="sorting"]').value;
    var newQuery = Router.current().params.query || {};

    if(sortby != ''){
      newQuery['sortby'] = sortby;
    }

    Router.go('properties', {page: 1}, {query: newQuery});
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


    var filter = {status: 'open'}
      , sortby = {createdAt: -1}
      , query = params.query
      , queryArr = []; // to pass in footer later

    for(var key in query){
      switch(key){
        case 'price':
          filter[key] = {$lte: parseInt(query[key], 10)};
          break;

        case 'mrtLines':
          if(!query['mrt']){
            filter['mrt'] = new RegExp(query[key]);
          }
          break;

        case 'rentType':
        case 'hasAgentFee':
          filter[key] = parseInt(query[key], 10);
          break;

        case 'sortby':
          var sortArr = query[key].split('By');
          sortby = {};
          sortby[sortArr[0]] = parseInt(sortArr[1], 10);
          break;

        default:
          filter[key] = query[key];
          break;
      }
      queryArr.push(key+'='+query[key]); //later convert the query back to string
    }

    if(filter['rentType'] == 0 && filter['roomtype']){
      filter['rentType'] = {$not: 1}; //only if rentType is 0, aka singple room and roomType is set
    } else {
      filter['roomtype'] = null; // else, unset roomtype
    }

    //handle multi address, method 1: Union

    //console.log(filter);

    var totalDocs = Properties.find(filter).count() //filter apply here too
      , noResult = false;


    if(totalDocs <= 0){ // if no result, return all and give notification
      filter = {}; //clear filter
      noResult = true;
      totalDocs = Properties.find(filter).count();
    }

    var totalPages = Math.ceil(totalDocs / pageLimit)
      , paginatedDocs = Properties.find(
          filter,
          {sort: sortby, skip: (pageNum-1)*pageLimit, limit: pageLimit}
        );


    // if(pageNum > totalPages){ //TODO: sometimes flash 'not found' even though have data
    //   this.render('notFound');
    //   return;
    // }
    //record lastest url
    Session.set('prevPath', Router.current().url);
    return {
      properties: paginatedDocs,
      totalDocs: totalDocs,
      noResult: noResult,
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
