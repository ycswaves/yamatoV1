Template.propertyDetail.rendered = function() {
  window.scrollTo(0, 0); //scroll back to top after editing
  initializeMap();
  render();
  $('.hoverInfo').popover();
  //pin it
  // $(".infoPanel").pin({containerSelector: ".infoArea",padding: {top: 112}});
}

function initializeMap() {
  var latitude = $('input[name="latitude"]').val() || null
    , longitude = $('input[name="longitude"]').val() || null;

  if(latitude && longitude) {
    L.mapbox.accessToken = 'pk.eyJ1IjoiZGF2ZW4wMDkiLCJhIjoiel9vX2hxSSJ9.Ag0_rnoJmLvScwqMR-gjyg';
    addressLatlng = [parseFloat(latitude), parseFloat(longitude)];
    var map = L.mapbox.map('mapbox', 'daven009.k1imgjff').setView(addressLatlng, 16);
    map.scrollWheelZoom.disable();
    L.marker(addressLatlng).addTo(map);
  } else {
    $('#mapbox').hide();
  }
}

Template.propertyDetail.events({
  'click #loadFoodPlace': function(e, t){
    /* https://developers.google.com/places/documentation/supported_types */
    // search 餐馆，诊所
    var latitude = $('input[name="latitude"]').val() || null
      , longitude = $('input[name="longitude"]').val() || null
      , propId = $('input[name="propId"]').val() || null;

    if(latitude && longitude && propId) {
      GooglePlace.getNearby(latitude, longitude, 'restaurant|food',
        function(err, data){
          console.log(data);
          if(data.results.length>0){//and save these info into DB
            Meteor.call('saveNearby', propId, 'food', data.results, function(e){
              if(e){console.log(e);}
            });
          }
        }
      );
    }
  },

  'click #return-btn': function(e,t){
    Router.go(Session.get('prevPath') || 'landing');
  },

  'click #enquiry-btn': function(e,t){
    var referId = t.find('#enquiry-btn').getAttribute('data-refer-id');
    Conversations.start(referId,'Property');
  }
});


PropertyDetailController = RouteController.extend({
  waitOn: function () {
    return Meteor.subscribe('propertyDetail', this.params.id)
          && Meteor.subscribe('propertyNearby', this.params.id);
  },
  template: 'propertyDetail',
  action: function () {
    if (this.ready()){
      Meteor.call('incPropertyView', this.params.id); //TODO: use sampling if high I/O
      this.render();
    }
    else{
      this.render('loading');
    }
  },

  data: function () {
      var params = this.params;
      var property = Properties.findOne({_id: params.id});
      if(!property){
        this.render('notFound');
        return;
      }
      var isNotOwner = false;
      var bannerImage = false;
      var authorProfile = false;
      if(typeof property!="undefined"){
        if(property.author != Meteor.userId()) {
          isNotOwner = true;
        }
        bannerImage = property.photos[0];
        Meteor.subscribe("userProfile", property.author);
        var authorProfile = UserProfiles.findOne({userid:property.author});
      }

      //get nearby
      var nearby = NearbyCollection.findOne({propertyId: property._id});
      if(!nearby && property.map.latitude){ // if nearby not init, query google
        var lat = property.map.latitude
          , lng = property.map.longitude;

        //search 超市
        GooglePlace.getNearby(lat, lng, 'grocery_or_supermarket',
          function(err, data){
            //console.log(data);
            if(data.results.length>0){//and save these info into DB
              Meteor.call('saveNearby', property._id, 'mart', data.results, function(){});
            }
          }
        );

        // search 餐馆
        GooglePlace.getNearby(lat, lng, 'restaurant|food',
          function(err, data){
            //console.log(data);
            if(data.results.length>0){//and save these info into DB
              Meteor.call('saveNearby', property._id, 'food', data.results, function(){});
            }
          }
        );
        //TODO: search clinic

      }

      return {
        property: property,
        nearby: nearby,
        isNotOwner: isNotOwner,
        bannerImage: bannerImage,
        authorProfile: authorProfile
      }
    }
});
