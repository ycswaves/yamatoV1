Template.myPropertyList.rendered = function() {
  render();
}

Template.myPropertyList.helpers({
  propertyStatus: function(){
    $('select').selectpicker(); // TODO: hacking, fix if better soln found
    return Config.getAllPropertyStatus();
  }
});