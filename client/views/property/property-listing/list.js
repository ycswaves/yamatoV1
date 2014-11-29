Template.propertyListing.rendered = function() {
  render();
}

Template.propertyListing.helpers({
  enter : function() {
    return function(stateModifier, done) {
      stateModifier.setOpacity(0); // hide initially
      // fadeIn and invoke done() on completion
      stateModifier.setOpacity(1, { duration: 500, curve: 'easeOut' }, done);
    };
  },

  leave : function() {
    return function(stateModifier, done) {
      // fadeOut and invoke done() on completion
      stateModifier.setOpacity(0, { duration: 500, curve: 'easeOut' }, done);
    };
  }
});

Template.propertyListing.events({
  'click li.pageLink': function(){
    window.scrollTo(0, 0);
  },

  'change select[name="sorting"]': function(e, t){
    var sortby = t.find('select[name="sorting"]').value;
    t.find('button').blur(); //need to force to blur
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

        case 'roomType':
          filter['rentType'] = {$not: 1};
          break; //TODO: check roomtype and rent type at loop end

        case 'sortby':
          var sortArr = query[key].split('By');
          sortby = {};
          sortby[sortArr[0]] = parseInt(sortArr[1], 10);
          break;

        default:
          filter[key] = query[key];
          break;
      }
      queryArr.push(key+'='+query[key]); //later revert the query back to string
    }

    var totalDocs = Properties.find(filter).count() //filter apply here too
      , totalPages = Math.ceil(totalDocs / pageLimit)
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
