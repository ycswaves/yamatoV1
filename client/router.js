Router.configure({
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  layoutTemplate: 'layout',
  trackPageView: true //for google analytics
});

var filters = {
  isLoggedIn: function() {
    if (!(Meteor.user() || Meteor.loggingIn())) {
      Router.go('signin');
    } else {
      this.next();
    }
  }
};

var storeUrl = function(){
  Session.set('currentPath', Router.current().url);
  this.next();
};

var prevUrl = function(){
  Session.set('prevPath', Router.current().url);
  this.next();
};

var isAdmin = function(){
  if (!Meteor.user().isAdmin) {
    Router.go('landing');
  } else {
    this.next();
  }
};

var isVerified = function(){
  var status = CommonHelper.getEmailAndStatusByUserId(Meteor.userId());
  console.log(status);
  console.log(Meteor.user().isAdmin);
  if(!Meteor.user().isAdmin) {
    if(status){
      if(status.verified){
        this.next();
      }
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction(filters.isLoggedIn, {except: ['landing','signin','signup','properties','propertyDetail']});
Router.onBeforeAction(storeUrl, {only: ['landing','properties','propertyDetail']});
Router.onBeforeAction(prevUrl, {except: ['signin','signup','propertyDetail']});
Router.onBeforeAction(isAdmin, {only: ['adminuser','adminproperty']});
Router.onBeforeAction(isVerified, {only: ['addProperty']});

var TITLE = '家易';
Router.map(function () {
  this.route('landing', {
    path: '/',
    template: 'landingPage',
    action: function () {
      this.render();
    },
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '新加坡一站式搜房租房买房平台';
    }
  });

  this.route('signin', {
    path: '/account/signin',
    template: 'loginForm',
    parent:'landing',
    label: '登录',
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
    parent:'landing',
    label: '注册',
    action: function () {
      this.render();
    },
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '注册';
    }
  });

  this.route('profile', {
    path: '/profile',
    template: 'profilePage',
    parent:'landing',
    label: '个人简介',
    waitOn: function () {
      return Meteor.subscribe("userProfile", Meteor.userId());
    },
    action: function () {
      this.render();
    },
    data: function () {
      var profile = UserProfiles.findOne({userid: Meteor.userId()});
      return {
        profile: profile
      }
    },
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '帐户';
    }
  });

  this.route('myproperty', {
    path: '/myproperty/list/:type/:page',
    parent:'landing',
    label: '我的房屋',
    controller: 'MyPropertiesController',
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '我的房屋';
    }
  });

  this.route('adminuser', {
    path: '/admin/user/:type/:page',
    parent:'landing',
    label: '管理用户',
    controller: 'AdminUsersController',
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '管理用户';
    }
  });

  this.route('adminproperty', {
    path: '/admin/property/:type/:page',
    parent:'landing',
    label: '管理房屋',
    controller: 'AdminPropertiesController',
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '管理房屋';
    }
  });

  this.route('properties', {
    path: '/properties/list/:page',
    parent:'landing',
    label: '房屋列表',
    controller: 'ListController',
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '房屋列表';
    }
  });

  this.route('addProperty', {
    path: '/properties/add',
    parent:'landing',
    label: '发布房屋信息',
    controller: 'AddPropertyController',
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '发布';
    }
  });

  this.route('editProperty', {
    path: '/properties/edit/:id',
    parent:'landing',
    label: '修改房屋信息',
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
        Meteor.call('incPropertyView', this.params.id); //TODO: use sampling if high I/O
        this.render();
      }
      else{
        this.render('loading');
      }
    },
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '房屋详情';
      // var property = this.data().property;
      // var bannerImage = this.data().bannerImage;
      // SEO.set({
      //   meta: {
      //     'description': property.description
      //   },
      //   og: {
      //     'description': property.description,
      //     'image': bannerImage
      //   }
      // });
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

  this.route('sales', {
    path: '/sales/list',
    controller: 'SalesListController',
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '二手产品列表';
    }
  });

  this.route('inbox', {
    path: '/inbox',
    template: 'inboxPage',
    parent:'landing',
    label: '收件箱',
    action: function () {
      this.render();
    },
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '收件箱';
    }
  });

  this.route('security', {
    path: '/security',
    template: 'securityPage',
    parent:'landing',
    label: '安全设置',
    action: function () {
      this.render();
    },
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '安全设置';
    }
  });

  // matches all urls but doesn't get called until all previous routes have been tested
  // so in this case for invalid url
  this.route('notFound', {path: '*'});
})

_.extend(Router,{
  parentRoutes:function(){
    if(!this.current()){
      return;
    }
    //
    var routes=[];
    for(var route=this.current().route;!_.isUndefined(route);route=this.routes[route.options.parent]){
      routes.push(route);
    }
    return routes.reverse();
  }
});
