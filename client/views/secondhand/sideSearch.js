Template.sideSearchSecondhand.rendered = function() {
  ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));
}

Template.sideSearchSecondhand.events({
  'change #mrtlines': function(e, t){
    e.preventDefault();
    var mrtLine = t.find('select[name="mrtlines"]').value;
    ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLine));
    Deps.flush();
    t.$('#stations').selectpicker('refresh');
  }
});

Template.sideSearchSecondhand.helpers({
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

});