Template.pagination.helpers({
  paginate: function(config){
    var midIndex = parseInt(config.windowSize / 2)
      , totalPages = Math.ceil(config.totalDocs / config.pageLimit)
      , startPage = (config.pageNum <= midIndex)? 1 : (config.pageNum - midIndex)
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
        pageNumberArr.unshift(pageNumberArr[0] - 1);
      }
    }
    return {
      paginations: pageNumberArr,
      currentPage: config.pageNum,
      routeName: config.routeName,
      routeParam: config.routeParam,
      queryStr: queryStr
    };
  }
});