Template.sideSearch.rendered = function() {
  ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));
  
  $('body').off('click','[data-toggle="offcanvas"]').on('click','[data-toggle="offcanvas"]', function() {
    $('.row-offcanvas').toggleClass('active')
  });
}

Template.sideSearch.events({
  'change #mrtlines': function(e, t){
    e.preventDefault();
    var mrtLine = t.find('select[name="mrtlines"]').value;
    ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLine));
    Deps.flush();
    t.$('#stations').selectpicker('refresh');
  },

  'change #rent-type': function(e, t){
    e.preventDefault();
    var rentType = t.find('select[name="rent-type"]').value;
    if(rentType == 1){
      t.$('#room-type').parent().hide();
    }
    else{
      t.$('#room-type').parent().show();
    }
  },

  'submit #search-form-sidebar': function(e, t){
    e.preventDefault();

    /*********************************************
        Retrieve form data
    *********************************************/
    var price = t.find('select[name="price"]').value || null
      , district = t.find('select[name="district"]').value || null
      , pType = t.find('select[name="property-type"]').value || null
      , rType = t.find('select[name="room-type"]').value || null
      , rentType = t.find('select[name="rent-type"]').value || null
      , hasAgentFee = t.find('select[name="has-agent-fee"]').value || null
      //, moveInDate = t.find('input[name="move-in-date"]').value || null
      //, bedroom = t.find('select[name="bedroom"]').value || null
      //, bathroom = t.find('select[name="bathroom"]').value || null
      , mrtLines = t.find('select[name="mrtlines"]').value || null
      , nearestMRT = t.find('select[name="stations"]').value || null;

    /*********************************************
        Map form data to schema
    *********************************************/
    var filter = {
      price: (price != null)? parseInt(price, 10) : null,
      district: district,
      propertyType: pType,
      hasAgentFee: (hasAgentFee != null)? parseInt(hasAgentFee, 10) : null,
      rentType: (rentType != null)? parseInt(rentType, 10) : null,
      roomType: rType,
      //moveInDate: (moveInDate != null)? new Date(moveInDate) : new Date(),
      //bedroom: (bedroom != null)? parseInt(bedroom, 10) : null,
      //bathroom: (bathroom != null)? parseInt(bathroom, 10) : null,
      mrtLines: mrtLines,
      mrt: nearestMRT
    };

    var queryArr = [];
    for (var key in filter){
      if(filter[key] != null){
        queryArr.push(key+'='+filter[key]);
      }
    }
    console.log(filter);
    Router.go('properties', {page: 1}, {query: queryArr.join('&')});
    $('#sideSearchModal').modal('hide');
  }
});

Template.sideSearch.helpers({
  district: function(){
    return Config.getDistrict();
  },

  mrtlines: function(){
    return Config.getMRT();
  },

  stations: function(){
    var mrtline = Router.current().params.query.mrtLines;
    if(mrtline){
      return Config.getStationsByLine(mrtline);
    } else {
      return ReactiveDS.get('mrtline');
    }
  },

  facilities: function(){
    return Config.getFacilities();
  },

  ptypes: function(){
    return Config.getPropertyTypes();
  },

  rtypes: function(){
    return Config.getRoomTypes();
  },

  priceRange: function(){
    return Config.getPriceRange();
  },

  currentQuery: function(){
    return Router.current().params.query
  }

});