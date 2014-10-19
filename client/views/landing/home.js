Template.landingPage.rendered = function() {
    render();
    ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));
}

Template.landingPage.events({
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

  'submit #search-form-landing': function(e, t){
    e.preventDefault();

    /*********************************************
        Retrieve form data
    *********************************************/
    var price = t.find('select[name="price"]').value || null
      , district = t.find('select[name="district"]').value || null
      , pType = t.find('select[name="property-type"]').value || null
      , nearestMRT = t.find('select[name="stations"]').value || null;

    /*********************************************
        Map form data to schema
    *********************************************/
    var filter = {
      price: price,
      district: district,
      propertyType: pType,
      mrt: nearestMRT
    };

    var queryArr = [];
    for (var key in filter){
      if(filter[key]){
        queryArr.push(key+'='+filter[key]);
      }
    }

    Router.go('properties', {page: 1}, {query: queryArr.join('&')});
  }
});



Template.landingPage.helpers({
  district: function(){
    return Config.getDistrict();
  },

  mrtlines: function(){
    return Config.getMRT();
  },

  stations: function(){
    return ReactiveDS.get('mrtline');
  },

  ptypes: function(){
    return Config.getPropertyTypes();
  }
});
