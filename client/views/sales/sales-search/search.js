Template.salesSideSearch.rendered = function() {
  ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));
}

Template.salesSideSearch.events({
  'change #mrtlines': function(e, t){
    e.preventDefault();
    var mrtLine = t.find('select[name="mrtlines"]').value;
    ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLine));
    Deps.flush();
    t.$('#stations').selectpicker('refresh');
  },
  'change #categories': function(e, t){
    e.preventDefault();
    var cat = t.find('select[name="categories"]').value;
    ReactiveDS.set('cat', Config.getSubByCategory(cat));
    Deps.flush();
    t.$('#subs').selectpicker('refresh');
  }
});

Template.salesSideSearch.helpers({
  district: function(){
    return Config.getDistrict();
  },

  mrtlines: function(){
    console.log(Config.getMRT());
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

  categories: function(){
    return Config.getSales();
  },

  subs: function(){
    var cat = Router.current().params.query.cat;
    if(cat){
      return Config.getSubByCategory(cat);
    } else {
      return ReactiveDS.get('cat');
    }
  }
});