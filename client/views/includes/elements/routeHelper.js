var autoCompl = new GoogleAutoComplete();
Template.routeHelper.events({
  'focus input[name="route-origin"]': function(e, t){
    autoCompl.geolocate();
  },
  'focus input[name="route-destination"]': function(e, t){
    autoCompl.geolocate();
  }
})


Template.routeHelper.rendered = function() {
  //删除路线信息
  // delete Session.keys['Direction.routes'];

  autoCompl.init('route-origin', function(places){
    searchForRoute();
  });

  autoCompl.init('route-destination', function(places){
    searchForRoute();
  });

  function searchForRoute(){
    var origin = $('#route-origin').val();
    var destination = $('#route-destination').val();
    if (!CommonHelper.isEmptyString(origin) && !CommonHelper.isEmptyString(destination)){
      var mode = null;
      $('.travel-mode').each(function(){
        if ($(this).hasClass('selected')) {
          mode = $(this).data('travel-mode');
        }
      })
      GoogleDirection.to(origin,destination,mode,function(data){
        if (data.status == "OK") {
          Session.set('Direction.routes',data.routes);
          console.log(Session.get('Direction.routes'));
        }
        else {
          console.log(data.status);
        }
      })
    }
  }

  $('body').off('click','.travel-mode').on('click','.travel-mode',function(){
    $('.travel-mode').removeClass('selected');
    $(this).addClass('selected');
  })
}

Template.routeHelper.helpers({
  routes: function(){
    return Session.get('Direction.routes');
  }
})