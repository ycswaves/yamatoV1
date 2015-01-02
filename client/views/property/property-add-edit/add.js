var global_imgTemp = []; //to hold the to be uploaded images temporarily
var global_autoCompl = new GoogleAutoComplete();
var global_location = undefined;
var global_addrChanged = false; //to test if address is edited

Template.addProperty.rendered = function() {
  $('.datepicker').pickadate({
    format: 'yyyy/mm/dd'
  });
  $('.picker__holder').css('min-width', '274px');
  $('.icheck').iCheck({
    checkboxClass: 'icheckbox_square-blue',
    radioClass: 'iradio_square-blue'
    //increaseArea: '20%' // optional
  });

  $('#upload').dropzone({
    addRemoveLinks : true,
    maxFiles: Config.getMaxImageUploaded(),
    maxFilesize: Config.getMaxImageSize(),
    acceptedFiles: 'image/*',
    accept: function(file, done) {
      if(file.upload.bytesSent <= Config.getMaxImageSize()*1024){
        global_imgTemp.push(file);
      }
    },
    removedfile: function(file){
      // remove preview
      file.previewElement.parentNode.removeChild(file.previewElement);
      // remove the file from temp queue
      global_imgTemp.forEach(function(e, i){
        if(e.name == file.name){
          global_imgTemp.splice(i,1);
        }
      });
    }
  });
  
  render();
  $('.dropzone .dz-default.dz-message').css('width','0px'); //hide dropzoneJS default img

  global_autoCompl.init('submit-title', function(place){
    var address = place.formatted_address,
        postcodeFound = address.match(/singapore (\d{6})/i);

    if(place.geometry.location){
      var lat = place.geometry.location.k
        , lng = place.geometry.location.D;

      global_location = { // get geometry and store in global variable to use later
        latitude: lat,
        longitude: lng
      };

      // search mrt station
      GooglePlace.getNearby(lat, lng, 'subway_station', function(err, data){
        if(data.results.length>0){
          var mrtName = data.results[0].name;
          var stationInfoObj = Config.getStationCodeByName(mrtName);
          ReactiveDS.set('mrtline', Config.getStationsByLine(stationInfoObj.lineCode));
          Deps.flush();
          $('select[name="mrtlines"]').val(stationInfoObj.lineCode);
          // $('#mrtlines').selectpicker('refresh');
          $('select[name="stations"]').val(stationInfoObj.stationCode);
          // $('#stations').selectpicker('refresh');
        }
      });


    }

    // Update postcode field and district selection
    if(postcodeFound && postcodeFound.length>1){
      var postcode = postcodeFound[1];
      $('#propertyForm input[name="postcode"]').val(postcode);
      var districtCode = Config.getDistrictByPostal(postcode);
      if(districtCode){
        $('select[name="district"]').val(districtCode);
        // $('select[name="district"]').selectpicker('refresh');
      }
    }
  });
}

Template.addProperty.events({
  'change #rent-type': function(e, t){
    e.preventDefault();
    var rentType = t.find('select[name="rent-type"]').value;
    if(rentType == 1){
      t.$('#room-form-group').parent().hide();
    }
    else{
      t.$('#room-form-group').parent().show();
    }
  },

  'change #mrtlines': function(e, t){
    e.preventDefault();
    var mrtLine = t.find('select[name="mrtlines"]').value;
    ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLine));
    Deps.flush();
    // t.$('#stations').selectpicker('refresh');
  },

  'change input[name="address"], change input[name="postcode"]': function(e, t){
    global_addrChanged = true; // to notify server to delete nearby upon form submission
  },

  'keyup input[name="address"], keypress input[name="address"]': function(e, t){
    if (e.keyCode == 13) {
      e.preventDefault();
      return false;
    }
  },

  'submit #propertyForm': function(e, t){
    e.preventDefault();
    CommonHelper.lockForm(t);
    t.$('span.help-block').remove(); //clear all error msg

    /*********************************************
        Retrieve form data
    *********************************************/
    var address = t.find('input[name="address"]').value || null
      , postcode = t.find('input[name="postcode"]').value || null
      , price = t.find('input[name="price"]').value || null
      , descr = t.find('textarea[name="description"]').value || null
      , district = t.find('select[name="district"]').value || null
      // deal type
      , pType = t.find('select[name="property-type"]').value || null
      , rType = t.find('select[name="room-type"]').value || null
      , rentType = t.find('select[name="rent-type"]').value || null
      , hasAgentFee = t.find('input:checked[name="has-agent-fee"]').value || null
      , moveInDate = t.find('input[name="move-in-date"]').value || null
      , bedroom = t.find('select[name="bedroom"]').value || null
      , area = t.find('input[name="property-area"]').value || null
      , bathroom = t.find('select[name="bathroom"]').value || null
      , nearestMRT = t.find('select[name="stations"]').value || null
      // photo gallerty
      , facilities = t.findAll('input:checkbox.property-facility').reduce(function (pre, current) {
          if(current.checked){
            pre.push(current.value);
          }
          return pre;
        }, [])

      , contactInfo = {
          name: t.find('input[name=contact-person]').value || null,
          phone: t.find('input[name=contact-number]').value || null,
          qq: t.find('input[name=contact-qq]').value || null,
          wechat: t.find('input[name=contact-wechat]').value || null,
          email: t.find('input[name=contact-email]').value || null
        };

    /*********************************************
        Map form data to schema
    *********************************************/

    var formObj = {
      address: address,
      author: Meteor.userId(),
      postcode: postcode,
      price: (price != null)? parseInt(price, 10) : null,
      description: descr,
      district: district,
      propertyType: pType,
      hasAgentFee: (hasAgentFee != null)? parseInt(hasAgentFee, 10) : null,
      rentType: (rentType != null)? parseInt(rentType, 10) : null,
      roomType: rType,
      moveInDate: (moveInDate != null)? new Date(moveInDate) : new Date(),
      bedroom: (bedroom != null)? parseInt(bedroom, 10) : null,
      area: (area != null)? parseInt(area, 10) : null,
      bathroom: (bathroom != null)? parseInt(bathroom, 10) : null,
      mrt: nearestMRT,
      contact: contactInfo,
      facilities: facilities,
      map: global_location
    };

    /*************************************************
        Map div id to schema, so as to attach
        error message in correspondant form-group
        key: schema attribute,
        value: form-group div ID Selector(include '#')
    **************************************************/
    var formErrDivID = {
      "address": "#address-form-group",
      //author: "",
      "postcode": "#postcode-form-group",
      "price": "#price-form-group",
      "description": "#descr-form-group",
      //"district": "district-form-group",
      //"propertyType": pType,
      //"hasAgentFee": hasAgentFee,
      "moveInDate": "#movein-form-group",
      "area": "#area-form-group",
      "bedroom": "#bedroom-form-group",
      "bathroom": "#bathroom-form-group",
      //mrt: nearestMRT,
      //facilities: facilities
      "contact.name": "#contact-person-form-group",
      "contact.phone": "#contact-number-form-group"
        //qq: '#',
        //wechat: '#',
        //email: '#'
    };
    var context = Properties.simpleSchema().namedContext('propertyForm');
    context.validate(formObj);

    // console.log(context);return;
    if(!context.isValid()){
      CommonHelper.unlockForm(t);
      CommonHelper.showErrorMessageInForm(context, formErrDivID, t);
    }
    else {
      /*********************************************
          data available in edit mode
      *********************************************/
      var propertyid = t.find('input[name="propertyid"]').value || ''
        , existingPhotosArr = []
        , deletedPhotoArr = [];

      $('.existingImage').each(function(){
        if($(this).hasClass('deleted')){
          deletedPhotoArr.push($(this).data('id'));
        }
        else {
          existingPhotosArr.push($(this).data('id'));
        }
      });


      var imageIDs = []
        , toBeInsert = global_imgTemp.length
        , insertCounter = 0;

      if(toBeInsert > 0){
        global_imgTemp.forEach(function(file){
          // PropertyImages.insert will return file object of inserted image
          if(imageIDs.length + existingPhotosArr.length >= Config.getMaxImageUploaded()){
            return; //resulted photo should not exceeds max allowd
          }
          PropertyImages.insert(file, function(err, imageUploaded){
            if(err){
              //bcoz it's async, even if upload fail, the rest fields should be saved
              // and redirect to the property detail
            } else {
              imageIDs.push(imageUploaded._id);
            }

            insertCounter++; //order matters: MUST inc first, then check if >= toBeInsert
            if(insertCounter >= toBeInsert){
              formObj.photos = imageIDs.concat(existingPhotosArr);
              creatPropertyPost(formObj, propertyid, deletedPhotoArr);
              global_imgTemp = []; //clear global_imgTemp
            }

          });
        });
      } else {
        formObj.photos = existingPhotosArr;
        creatPropertyPost(formObj, propertyid, deletedPhotoArr);
      }
    }
  },

  'click .existingImage': function(e, t){
    e.preventDefault();
    var icon = $(e.target)
      , iconAnchor = icon.parent()
      , imgDiv = iconAnchor.parent()
      , imgID = iconAnchor.data('id');

    imgDiv.toggleClass('gray-out');
    icon.toggleClass('fa-undo fa-trash-o');
    //mark as deleted, so when submit form, only select deleted ones
    iconAnchor.toggleClass('deleted');
  }
});

var creatPropertyPost = function(formObj, propertyid, deletedPhotoArr){
    var insert = function(){
      if(propertyid.length > 0){ // edit mode
        Meteor.call('editProperty', propertyid, formObj, function(err){
          if(err){
            NotificationMessages.sendSuccess('发布','房屋资料更新失败');
            return false;
          }
          if(deletedPhotoArr.length > 0){
            Meteor.call('deletePropertyImgs', deletedPhotoArr);
          }
          if(global_addrChanged){
            //delete previous address nearby info,
            // and info will be re-retrieved in propertyDetail after redirect
            Meteor.call('deleteNearby', propertyid);
          }
          Router.go('propertyDetail', {id: propertyid});
        });
      }
      else{ // add new mode
        Meteor.call('addProperty', formObj, function(err, id){
          if(err){
            NotificationMessages.sendSuccess('发布','房屋发布失败');
            return false;
          }
          Router.go('propertyDetail',{id:id});
        });
      }
    };

    if (formObj.map) {
      insert();
    } else {
      // if all fields are valid, convert postcode to latitude-longitude
      CommonHelper.convertAddressAsync(formObj.postcode, function(err, addr){
        if(addr){
          formObj.map = addr;
        }
        insert();
      });
    }
}

Template.addProperty.helpers({
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

  maxFiles: function(){
    return Config.getMaxImageUploaded();
  },

  maxFilesize: function(){
    return Config.getMaxImageSize();
  },

  bathroomNum: function(){
    return Config.getBathroomNum();
  },

  bedroomNum: function(){
    return Config.getBedroomNum();
  }

});

AddPropertyController = RouteController.extend({
  template: 'addProperty',
  waitOn: function () {
    return Meteor.subscribe("currentUserData");
  },

  action: function () {
    this.render();
  },

  data: function () {
    ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));
    return {
      myProperty: null,
      myProfile: UserProfiles.findOne({userid: Meteor.userId()})
    }
  },

  onAfterAction: function(){
    if($('input[name="propertyid"]').value == undefined){
      $('div.icheckbox').removeClass('checked');
      $('#property-features input[type="checkbox"]').prop('checked', false);
      // $('#stations').selectpicker('refresh');
    }//Due to the template we use, the checkbox and selection box need extra handle
     // e.g removeClass, besides clear the actual checkbox
  }
});

EditPropertyController = RouteController.extend({
  waitOn: function () {
    return Meteor.subscribe('propertyDetail', this.params.id);
  },

  template: 'addProperty', //share template with add property
  action: function () {
    if (this.ready()){
      this.render();
    }
    else{
      this.render('loading');
    }
  },

  data: function () {
    var params = this.params
      , myProp = Properties.findOne({_id: params.id, author: Meteor.userId()});
    if(params.id && myProp!=undefined){
      var mrtLineCode = myProp.mrt.substr(0, 2);
      ReactiveDS.set('mrtline', Config.getStationsByLine(mrtLineCode));
      return {
        myProperty: myProp,
        myProfile: false
      }
    }
    else{
      Router.go('myproperty',{type:'open', page:1});
    }
  },
});






