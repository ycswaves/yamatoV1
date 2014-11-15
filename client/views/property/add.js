var imgTemp = []; //to hold the to be uploaded images temporarily

Template.addProperty.rendered = function() {
  $('.datepicker').pickadate({
    format: 'yyyy/mm/dd'
  });
  $('.picker__holder').css('min-width', '274px');

  //Dropzone.autoDiscover = false;
  //dictResponseError = 'Error uploading file!';
  $('#upload').dropzone({
    addRemoveLinks : true,
    maxFiles: Config.getMaxImageUploaded(),
    maxFilesize: Config.getMaxImageSize(),

    init: function () {
        this.on("complete", function (file) {
          console.log(file); //TODO: check file size again
          imgTemp.push(file);
        });
    },
    // accept: function(file, done) {
    //   //todo: process file
    //   imgTemp.push(file);
    // },
    removedfile: function(file){
      // remove preview
      file.previewElement.parentNode.removeChild(file.previewElement);
      // remove the file from temp queue
      imgTemp.forEach(function(e, i){
        if(e.name == file.name){
          imgTemp.splice(i,1);
        }
      });
    }
  });
  render();
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
    t.$('#stations').selectpicker('refresh');
  },

  'blur input[name="address"]': function(e, t){
    var address = t.find('input[name="address"]').value || null
    CommonHelper.convertAddressAsync(address, function(err, addr){
      if(err){
        t.$('#address-form-group').append(
        '<span style="color: yellow" class="help-block"><i class="fa fa-exclamation-triangle"></i> '
        + '无法在地图上找到此地址，请再次确认' +
        '</span>');
      }
      // else{
      //   console.log(addr);
      // }
    });
  },

  'submit #propertyForm': function(e, t){
    e.preventDefault();
    t.$('span.help-block').remove(); //clear all error msg

    /*********************************************
        Retrieve form data
    *********************************************/
    var address = t.find('input[name="address"]').value || null
      , price = t.find('input[name="price"]').value || null
      , descr = t.find('textarea[name="description"]').value || null
      , district = t.find('select[name="district"]').value || null
      // deal type
      , pType = t.find('select[name="property-type"]').value || null
      , rType = t.find('select[name="room-type"]').value || null
      , rentType = t.find('select[name="rent-type"]').value || null
      , hasAgentFee = t.find('input:checked[name="has-agent-fee"]').value || null
      , moveInDate = t.find('input[name="move-in-date"]').value || null
      , bedroom = t.find('input[name="bedroom"]').value || null
      , area = t.find('input[name="property-area"]').value || null
      , bathroom = t.find('input[name="bathroom"]').value || null
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

      var imageIDs = [];
      imgTemp.forEach(function(file){
        // PropertyImages.insert will return file object of inserted image
        var imageUploaded = PropertyImages.insert(file);
        imageIDs.push(imageUploaded._id);
      });

      imgTemp = []; //clear imgTemp

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
      else if(existingPhotosArr.length < Config.getMaxImageUploaded()){
        existingPhotosArr.push($(this).data('id'));
      }
    });

    /*********************************************
        Map form data to schema
    *********************************************/

    var formObj = {
      address: address,
      author: Meteor.userId(),
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
      photos: imageIDs.concat(existingPhotosArr),
      facilities: facilities
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
    if(!context.isValid()){
      CommonHelper.showErrorMessageInForm(context, formErrDivID, t);
    }
    else {
      // if all fields are valid, convert address to latitude-longitude
      CommonHelper.convertAddressAsync(address, function(err, addr){
        if(addr){
          formObj.map = addr;
        }

        if(propertyid.length > 0){ // edit mode
          Meteor.call('editProperty', propertyid, formObj, function(err){
            if(err){
              NotificationMessages.sendSuccess('发布','房屋资料更新失败');
              return false;
            }
            if(deletedPhotoArr.length > 0){
              Meteor.call('deletePropertyImgs', deletedPhotoArr);
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
            Router.go('myproperty');
          });
        }

      });
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
    return Config.maxFiles;
  },

  maxFilesize: function(){
    return Config.maxFilesize;
  }

});

AddPropertyController = RouteController.extend({
  template: 'addProperty',

  action: function () {
    this.render();
  },

  data: function () {
    ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));
    return {
      myProperty: null
    }
  },

  onAfterAction: function(){
    if($('input[name="propertyid"]').value == undefined){
      $('div.icheckbox').removeClass('checked');
      $('#property-features input[type="checkbox"]').prop('checked', false);
      $('#stations').selectpicker('refresh');
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
        myProperty: myProp
      }
    }
    else{
      Router.go('profile');
    }
  },
});






