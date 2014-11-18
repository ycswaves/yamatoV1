Handlebars.registerHelper('arrayify', function(obj){
  result = [];
  for (var key in obj) {
    result.push({'key':key,'value':obj[key]});
  };
  return result;
});

Handlebars.registerHelper('getUsername', function(loggedInUser){
  if(loggedInUser.username) return loggedInUser.username;
  if(loggedInUser.services){
    var service = loggedInUser.services;
    if(service.google){
      return service.google.name;
    }
    else if (service.facebook){
      return service.facebook.name;
    } else {
      return 'user';
    }
  }
});

Handlebars.registerHelper('getAvatarByTopicId', function(topicId){
  var topic = Topics.findOne({_id:topicId});
  if(topic.creator == Meteor.userId()) {
    var userId = topic.chatWith;
  }
  else {
    var userId = topic.creator;
  }
  Meteor.subscribe("userProfile", userId);
  var profile = UserProfiles.findOne({userid: userId});
  if (typeof profile != 'undefined') {
    return profile.avatar;
  }
  else {
    return false;
  }
});

Handlebars.registerHelper('getUserProfile', function(userId){
  Meteor.subscribe("userProfile", userId);
  return UserProfiles.findOne({userid: userId});
});

Handlebars.registerHelper('glueArray', function(arr){
  if(!arr) return '';
  return arr.join(',');
});

// used in display contact, in case of no value, '无' is displayed
Handlebars.registerHelper('nullHelper', function(obj){
  if(obj == undefined)
    return '无';
  else
    return obj;
});

// used in display active page in pagination
Handlebars.registerHelper('pageHelper', function(currentPage, pageNum){
  if(currentPage == pageNum)
    return 'active';
  else
    return '';
});

//used in form editing to pre-select options
Handlebars.registerHelper('ifSelected', function(optVal, formVal){
  if(!formVal) return;
  if(typeof formVal == 'object'){ // in case formVal is an Array (e.g property.facilities)
    if(formVal.indexOf(optVal) > -1)
      return 'checked';
    else
      return;
  }
  if(optVal == formVal)
    return 'selected';
  else
    return;
});

//used in form editing to pre-checked options
Handlebars.registerHelper('ifChecked', function(optVal, formVal){
  if(optVal == formVal)
    return 'checked';
  else
    return;
});

//used in form editing to pre-checked options
Handlebars.registerHelper('ifRadioChecked', function(optVal, formVal){
  if(optVal == formVal || formVal == undefined) //'formVal == undefined' for default check
    return 'checked';
  else
    return;
});

// used in form editing to check selected MRT Line
Handlebars.registerHelper('ifLineMatch',function(optVal, formVal){
  if(!formVal) return;
  var line = formVal.substr(0, 2);
  if(optVal == line)
    return 'selected';
  else
    return;
});

// used in form editing to hide/display room type
Handlebars.registerHelper('toggleRoomType',function(formVal){
  if(!formVal) return;
  if(formVal == 1)
    return 'none';
  else
    return;
});

//for testing purpose
Handlebars.registerHelper('log', function(obj){
  console.log(obj);
});

// helper for district
Handlebars.registerHelper('transDistr',function(val){
  var allDistr = Config.getDistrict();
  return allDistr[val];
});

// helper for MRT
Handlebars.registerHelper('transMRT',function(val){
  var allMRTs = Config.getMRT()
    , line = val.substr(0, 2);
  return allMRTs[line]['stations'][val];
});

// helper for property type
Handlebars.registerHelper('transPtype',function(val){
  var allTypes = Config.getPropertyTypes();
  return allTypes[val];
});

// helper for property facilities
Handlebars.registerHelper('transPfaci',function(val){
  var allFaci = Config.getFacilities();
  return allFaci[val];
});

// helper for move in date
Handlebars.registerHelper('transDatetime',function(date, format){
  if(date == undefined) return;

  if(typeof format == 'string'){
    return moment(date).format(format);
  }
  return moment(date).format('YYYY-MM-DD');
});

// helper for has agent fee
Handlebars.registerHelper('transAgt',function(val){
  return (val==1)? '有':'无';
});

// helper for room type
Handlebars.registerHelper('transRoom',function(rentType, room){
  var allRoomTypes = Config.getRoomTypes();
  return (rentType==1)? '整套' : allRoomTypes[room];
});

// helper for get image url
Handlebars.registerHelper('getImageURL',function(photos){
  var imgObj;
  if(typeof photos == 'string'){ // if argument is a photo id
    imgObj = PropertyImages.findOne({_id: photos});
  }
  else if(typeof photos == 'object' && photos.length > 0){ // if argument is array of photo IDs, return the 1st one
    imgObj = PropertyImages.findOne({_id: photos[0]}); // used in my properties listing, diplay the 1st pic, TODO: support select cover?
  }

  if(!imgObj || !imgObj.copies)
    return '/img/properties/property-03.jpg';
  else{
    return 'https://s3-ap-southeast-1.amazonaws.com/yamato-image/'+imgObj.copies['property-images'].key;
  }
});

// helper for get image url
Handlebars.registerHelper('formatViews',function(views){
  if(views > 1000){
    return (views/1000).toFixed(1)+'K';
  } else {
    return views;
  }
});

Handlebars.registerHelper('displayMap', function(mapDiv, locationObj){
  if(locationObj.latitude != undefined && locationObj.longitude != undefined) {
    var addressLatlng = [locationObj.latitude, locationObj.longitude];
    L.mapbox.accessToken = 'pk.eyJ1IjoiZGF2ZW4wMDkiLCJhIjoiel9vX2hxSSJ9.Ag0_rnoJmLvScwqMR-gjyg';
    var map = L.mapbox.map(mapDiv, 'daven009.k1imgjff').setView(addressLatlng, 16);
    map.scrollWheelZoom.disable();
    L.marker(latlng).addTo(map);
  } else {
    $('#'+mapDiv).text('无地理位置信息');
  }
});

