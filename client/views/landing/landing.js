Template.landing.rendered = function() {
	render();
	$('.selectpicker').selectpicker({
		container:'body',
		style:'btn-primary'
	});

	$('.icheck').iCheck({
		checkboxClass: 'icheckbox_flat-blue',
		radioClass: 'iradio_flat-blue'
		//increaseArea: '20%' // optional
	});

	if (Session.get('resetPassword')) {
		$('#resetPassModal').modal('show');
	}

	ReactiveDS.set('mrtline', Config.getStationsByLine('NS'));

	CommonHelper.initPillboxAutoCompl('multiAddress', 'input[name="multiAddress"]');

}


Template.landing.events({
  'keyup input[name="multiAddress"], keypress input[name="multiAddress"]': function(e, t){
    if (e.keyCode == 13) { //prevent enter in this field to submit form
      e.preventDefault();
      return false;
    }
  },

  'click .multiAddrLabel': function(e, t){
    e.preventDefault();
    var addr = t.$(e.target).attr('data-key')
      , existingAddr = Session.get('multiAddress');
    existingAddr[addr] = undefined; // Caution: existingAddr could become empty array upon deletion.
    Session.set('multiAddress', existingAddr);
    //隐藏已有的数据，但不擦除
    Directions.update({toAddr: addr}, {$set:{display: false}},{multi:true});
    $('input[name="multiAddress"]').val('');
    // to limit no of multiple address to 6
    CommonHelper.checkMultiAddrLimit('input[name="multiAddress"]', 6);
  },

	'focus input[name="intelAddress"]': function(e, t){
		autoCompl.geolocate();
	},

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
		, mrtLines = t.find('select[name="mrtlines"]').value || null
		, nearestMRT = t.find('select[name="stations"]').value || null;

		/*********************************************
		Map form data to schema
		*********************************************/
		var filter = {
			price: price,
			district: district,
			propertyType: pType,
			mrtLines: mrtLines,
			mrt: nearestMRT
		};

		var queryArr = [];
		for (var key in filter){
			if(filter[key] != null){
				queryArr.push(key+'='+filter[key]);
			}
		}

		Router.go('properties', {page: 1}, {query: queryArr.join('&')});
	}
});



Template.landing.helpers({
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
	},

	roomNum: function(){
		return Config.getRoomNum();
	},

	priceRange: function(){
		return Config.getPriceRange();
	},

	facilities: function(){
		return Config.getFavFacilities();
	},

  multiAddress: function(){
    return Session.get('multiAddress');
  }
});

Template.landing.created = function() {
	//验证邮箱
	if (Accounts._verifyEmailToken) {
		Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
			if (err != null) {
				if (err.message = 'Verify email link expired [403]') {
					swal('验证邮箱', '对不起，验证链接已失效...', 'error');
				}
			} else {
				swal('验证邮箱', '欢迎回来，已成功验证邮箱!', 'success');
			}
			//避免再次弹窗
			delete Accounts._verifyEmailToken;
		});
	};
	//忘记密码
	if (Accounts._resetPasswordToken) {
		Session.set('resetPassword',Accounts._resetPasswordToken);
		delete Accounts._resetPasswordToken;
	}
};
