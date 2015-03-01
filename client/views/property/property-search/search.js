Template.sideSearch.rendered = function() {
  //ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));
  $('.selectpicker').selectpicker({
    container:'body',
    style:'btn-white'
  });

  //to refresh the i18n in selectpicker
  CommonHelper.refreshSelectpickerLang();

  CommonHelper.initPillboxAutoCompl('multiAddress', 'input[name="multiAddress"]');
}

Template.sideSearch.events({
  'keyup input[name="multiAddress"], keypress input[name="multiAddress"]': function(e, t){
    if (e.keyCode == 13) { //prevent enter in this field to submit form
      e.preventDefault();
      return false;
    }
  },

  'click .multiAddrLabel': function(e, t){
    e.preventDefault();
    var addr = t.$(e.target).attr('data-key')
      , existingAddr = Session.get('multiAddress');
    delete existingAddr[addr]; // Caution: existingAddr could become empty array upon deletion.
    Session.set('multiAddress', existingAddr);
    //隐藏已有的数据，但不擦除
    Directions.update({toAddr: addr}, {$set:{display: false}},{multi:true});
    $('input[name="multiAddress"]').val('');
    // to limit no of multiple address to 6
    CommonHelper.checkMultiAddrLimit('input[name="multiAddress"]', 6);
  },

  'change #mrtlines': function(e, t){
    e.preventDefault();
    var mrtLineFromQuery = Router.current().params.query.mrtLines
      , mrtLineFromSearch = t.find('select[name="mrtlines"]').value;

    if(mrtLineFromSearch != ''){ // if user change mrtline at side search
      ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLineFromSearch));
    } else if (mrtLineFromQuery){ // otherwise return stations of mrtline in query
      ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLineFromQuery));
    }

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

  'change select': function(e, t){
    e.preventDefault();
    t.find('button').blur(); //need to force to blur
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
    //console.log(filter);
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
    return ReactiveDS.get('mrtline');
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
  },

  multiAddress: function(){
    return Session.get('multiAddress');
  }

});