Template.pagination.helpers({
  paginate: function(config){
    var midIndex = parseInt(config.windowSize / 2)
      , currPage = parseInt(config.pageNum)
      , totalPages = Math.ceil(config.totalDocs / config.pageLimit)
      , startPage = (currPage <= midIndex)? 1 : (currPage - midIndex)
      , queryStr = config.query
      , pageNumberArr = [];
    for(var i=0; i<config.windowSize; i++){
      var pNum = i+startPage;
      if(pNum > totalPages) break;
      pageNumberArr.push(pNum);
    }

    // if it's last page, pagination need to add previous pages to make the window size consistant
    if(pageNumberArr.length < config.windowSize
      && pageNumberArr[pageNumberArr.length-1] == totalPages
      && pageNumberArr[0] != 1){
      var fillGap = config.windowSize-pageNumberArr.length;
      for(var i=0; i<fillGap; i++){
        var addPage = pageNumberArr[0] - 1;
        if( addPage > 0 ){
          pageNumberArr.unshift(addPage);
        }

      }
    }

    var hasMore = (totalPages > pageNumberArr[pageNumberArr.length-1])? (currPage + 1) : false //decide if show "..."
      , hasPrev = (currPage > 1)? (currPage - 1) : false
      , hasNext = (currPage < totalPages)? (currPage + 1) : false;

    return {
      paginations: pageNumberArr,
      currentPage: currPage,
      routeName: config.routeName,
      routeParam: config.routeParam,
      queryStr: queryStr,
      hasMore: hasMore,
      hasPrev: hasPrev,
      hasNext: hasNext
    };
  }
});

Template.pagination.events({
  'click li.pageLink': function(){
    window.scrollTo(0, 0);
  }
})