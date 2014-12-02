Handlebars.registerHelper('arrayify', function(obj){
  result = [];
  for (var key in obj) {
    result.push({'key':key,'value':obj[key]});
  };
  return result;
});

Handlebars.registerHelper('getEmailAndStatusByUserId', function(userId){
  var loggedInUser = Meteor.users.findOne({_id:userId});
  if (typeof loggedInUser != "undefined") {
    if(loggedInUser.services){
      var service = loggedInUser.services;
      if(service.google){
        return {address:service.google.email, verified:true};
      }
      else if (service.facebook){
        return {address:service.facebook.email, verified:true};
      }
    }
    return loggedInUser.emails[0];
  }
});

Handlebars.registerHelper('isAdmin', function(userId){
  var user = Meteor.users.findOne({_id:userId});
  if (typeof user.isAdmin != "undefined") {
    return true;
  }
  else {
    return false;
  }
});

function _getUsernameByUserId(userId){
  var loggedInUser = Meteor.users.findOne({_id:userId});
  if (typeof loggedInUser != "undefined") {
    if(loggedInUser.username) return loggedInUser.username;
    if(loggedInUser.services){
      var service = loggedInUser.services;
      if(service.google){
        return service.google.name;
      }
      else if (service.facebook){
        return service.facebook.name;
      }
    }
  }
  //return default
  return 'user';
}

Handlebars.registerHelper('getUsernameByUserId', function(userId){
  return _getUsernameByUserId(userId);
});

//get username of someone you chat with
Handlebars.registerHelper('getUsernameByTopicId', function(topicId){
  var topic = Topics.findOne({_id:topicId});
  if(topic.creator == Meteor.userId()) {
    var userId = topic.chatWith;
  }
  else {
    var userId = topic.creator;
  }
  return _getUsernameByUserId(userId);
});

function _getAvatarByUserId(userId){
  Meteor.subscribe("userProfile", userId);
  var profile = UserProfiles.findOne({userid: userId});
  if (typeof profile != 'undefined') {
    if (profile.avatar != null) {
      return profile.avatar;
    }
    else {
      var user = Meteor.users.findOne({_id:userId});
      if (user.services) {
        var service = user.services;
        if(service.google){
          return service.google.picture;
        }
        else if (service.facebook){
          return 'https://graph.facebook.com/'+service.facebook.id+'/picture?width=165&height=165';
        }
      }
    }
  }
  //google default avatar
  return 'https://lh3.googleusercontent.com/-_vpNdZdH7QI/AAAAAAAAAAI/AAAAAAAAAAA/fmpFxHRfvb0/s96-c/photo.jpg';
}


Handlebars.registerHelper('getAvatarByUserId', function(userId){
  return _getAvatarByUserId(userId);
});

//get avatar of someone you chat with
Handlebars.registerHelper('getAvatarByTopicId', function(topicId){
  var topic = Topics.findOne({_id:topicId});
  if(topic.creator == Meteor.userId()) {
    var userId = topic.chatWith;
  }
  else {
    var userId = topic.creator;
  }
  return _getAvatarByUserId(userId);
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
Handlebars.registerHelper('activeClassHelper', function(a, b){
  if(a == b)
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

Handlebars.registerHelper('mrtColoredLabel', function(mrt,options){
  var lineCode = mrt.substr(0, 2);
  var bgColor;
  switch(lineCode){
    case 'NS':
    default:
      bgColor = '#CD231D';
      break;
    case 'EW':
      bgColor = '#009046';
      break;
    case 'NE':
      bgColor = '#9F01A4';
      break;
    case 'CC':
      bgColor = '#FB9C37';
      break;
    case 'DT':
      bgColor = '#1755B7';
      break;
  }

  var string = '';
  if (options == 'inline'){
    string = '<span class="label" style="padding: 2px;background-color:'+bgColor+'">'
                  + mrt +
                 '</span>';
  }
  else {
    string = '<span class="label" style="padding:4px;width:32px;position:absolute;right:10px;background-color:'+bgColor+'">'
                  + mrt +
                 '</span>';
  }
  return new Handlebars.SafeString(string);
});


