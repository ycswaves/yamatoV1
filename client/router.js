Router.configure({
notFoundTemplate: 'notFound',
loadingTemplate: 'loading',
layoutTemplate: 'layout'
});

var filters = {
	isLoggedIn: function() {
		if (!(Meteor.user() || Meteor.loggingIn())) {
			Router.go('signup');
		} else {
			this.next();
		}
	}
};

var storeUrl = function(){
	Session.set('currentPath', Router.current().url);
	this.next();
}

var prevUrl = function(){
	Session.set('prevPath', Router.current().url);
	this.next();
}

Router.onBeforeAction(filters.isLoggedIn, {except: ['landing','signin','signup','properties','propertyDetail']});
Router.onBeforeAction(storeUrl, {only: ['properties','propertyDetail']});
Router.onBeforeAction(prevUrl, {except: ['signin','signup','propertyDetail']});

var TITLE = '家易';
Router.map(function () {
	this.route('landing', {
		path: '/',
		template: 'landingPage',
		action: function () {
			this.render();
		},
		onAfterAction: function () {
			document.title = TITLE;
		}
	});

	this.route('signin', {
		path: '/account/signin',
		template: 'loginForm',
		action: function () {
			this.render();
		},
		onAfterAction: function () {
			document.title = TITLE + ' | ' + '登陆';
		}
	});

	this.route('signup', {
		path: '/account/signup',
		template: 'signupForm',
		action: function () {
			this.render();
		},
		onAfterAction: function () {
			document.title = TITLE + ' | ' + '注册';
		}
	});

	this.route('profile', {
		path: '/profile',
		waitOn: function () {
			return Meteor.subscribe("userProfile", Meteor.userId());
		},
		template: 'profilePage',
		action: function () {
			this.render();
		},
		data: function () {
			return {
		    profile: UserProfiles.findOne({userid: Meteor.userId()})
		  }
		},
		onAfterAction: function () {
			document.title = TITLE + ' | ' + '帐户';
		}
	});

	this.route('myproperty', {
		path: '/myproperty/list/:page',
		controller: 'MyPropertiesController',
		onAfterAction: function () {
			document.title = TITLE + ' | ' + '我的房屋';
		}
	});

	this.route('properties', {
		path: '/properties/list/:page',
		controller: 'ListController',
		onAfterAction: function () {
			document.title = TITLE + ' | ' + '房屋列表';
		}
	});

	this.route('addProperty', {
		path: '/properties/add',
		controller: 'AddPropertyController',
		onAfterAction: function () {
			document.title = TITLE + ' | ' + '发布';
		}
	});

	this.route('editProperty', {
		path: '/properties/edit/:id',
		controller: 'EditPropertyController',
		onAfterAction: function () {
			document.title = TITLE + ' | ' + '编辑';
		}
	});

	this.route('propertyDetail', {
		path: '/property/:id',
		waitOn: function () {
			return Meteor.subscribe('propertyDetail', this.params.id);
		},
		template: 'propertyDetail',
		action: function () {
			if (this.ready()){
				this.render();
			}
			else{
				this.render('loading');
			}
		},
		onAfterAction: function () {
			document.title = TITLE + ' | ' + '房屋详情';
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
			if(typeof property!="undefined"){
				if(property.author != Meteor.userId()) {
					isNotOwner = true;
				}
				bannerImage = property.photos[0];
			}
			return {
				property: property,
				isNotOwner: isNotOwner,
				bannerImage: bannerImage
			}
		}
	});

	this.route('inbox', {
		path: '/inbox',
		template: 'inboxPage',
		action: function () {
			this.render();
		},
		onAfterAction: function () {
			document.title = TITLE + ' | ' + '收件箱';
		}
	});

	// matches all urls but doesn't get called until all previous routes have been tested
	// so in this case for invalid url
	this.route('notFound', {path: '*'});
})
