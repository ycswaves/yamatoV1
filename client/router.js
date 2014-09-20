Router.configure({
  // notFoundTemplate: 'notFound',
  // loadingTemplate: 'loading',
  layoutTemplate: 'layout'
});

var filters = {
	isLoggedIn: function(pause) {
		if (!(Meteor.user() || Meteor.loggingIn())) {
			Router.go('landing');
      pause();
		}
	}
};

Router.onBeforeAction(filters.isLoggedIn, {except: ['landing']});

Router.map(function () {
	this.route('landing', {
		path: '/',
		template: 'landingPage',
    action: function () {
     this.render();
    }
	});

  this.route('profile', {
    path: '/profile',
    waitOn: function () {
      return Meteor.subscribe('userData');
    },
    template: 'profilePage',
    action: function () {
     this.render();
    }
  });

  this.route('myproperty', {
    path: '/myproperty',
    waitOn: function () {
      return Meteor.subscribe('userData');
    },
    template: 'myProperties',
    action: function () {
      if (this.ready()){
        this.render();
      }
      else{
        this.render('loading');
      }
    }
  });

  this.route('properties', {
    path: '/properties',
    controller: 'ListController'
  });

  this.route('addProperty', {
    path: '/properties/add',
    controller: 'AddPropertyController'
  });

  this.route('editProperty', {
    path: '/properties/edit/:id',
    controller: 'EditPropertyController'
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
    data: function () {
      var params = this.params;
      return {
        property: Properties.findOne({_id: params.id})
      }
    }
  });

  this.route('inbox', {
    path: '/inbox',
    template: 'inboxPage',
    action: function () {
      this.render();
    }
  });

  // matches all urls but doesn't get called until all previous routes have been tested
  // so in this case for invalid url
  this.route('notFound', {path: '*'});
})
