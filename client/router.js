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
  },
  isNotLoggedIn: function() {
    if (!(Meteor.user() || Meteor.loggingIn())) {
      this.next();
    } else {
      Router.go('landing');
    }
  }
};

var storeUrl = function(){
  Session.set('currentPath', Router.current().url);
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
  if(status){
    if(status.verified || Meteor.user().isAdmin){
      this.next();
    } else {
      Router.go('me');
      swal("注意!", "发布信息之前，请先验证你的邮箱", "warning");
    }
  }
}

var removeFullBg = function() {
  $('body').removeClass('fullbackground');
  this.next();
}

Router.onBeforeAction(removeFullBg);
Router.onBeforeAction(filters.isLoggedIn, {except: ['landing','signin','signup','properties','propertyDetail','terms']});
Router.onBeforeAction(filters.isNotLoggedIn, {only: ['signin']});
Router.onBeforeAction(storeUrl, {only: ['properties','propertyDetail']}); //TODO: may add more
Router.onBeforeAction(isAdmin, {only: ['adminuser','adminproperty']});
Router.onBeforeAction(isVerified, {only: ['addProperty']});

var TITLE = '家易';

Router.map(function () {
  this.route('landing', {
    path: '/',
    template: 'landing',
    action: function () {
      this.render();
    },
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '新加坡一站式搜房租房买房平台'
      })
    }
  });

  this.route('signin', {
    path: '/account/signin',
    template: 'signin',
    parent:'landing',
    label: 'login',
    action: function () {
      this.layout('layoutPlain');
      $('body').addClass('fullbackground');
      this.render();
    },
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '登陆'
      })
    }
  });

  this.route('signup', {
    path: '/account/signup',
    template: 'signup',
    parent:'landing',
    label: 'register',
    action: function () {
      this.layout('layoutPlain');
      $('body').addClass('fullbackground');
      this.render();
    },
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '注册'
      })
    }
  });

  this.route('v2', {
    path: '/v2',
    template: 'v2',
    label: '注册',
    action: function () {
      this.layout('layoutPlain');
      $('body').addClass('fullbackground');
      this.render();
    }
  });

  this.route('me', {
    path: '/account/me',
    template: 'me',
    parent:'landing',
    label: 'my_management',
    waitOn: function () {
      return Meteor.subscribe("userProfile", Meteor.userId());
    },
    action: function () {
      this.render();
    },
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '个人主页'
      })
    }
  });

  this.route('myproperty', {
    path: '/account/myproperty/list/:type/:page',
    template: 'myProperties',
    parent:'landing',
    label: 'my_property',
    controller: 'MyPropertiesController',
    waitOn: function () {
      return (Meteor.subscribe('userData') && Meteor.subscribe("myProperty", Meteor.userId()));
    },
    action: function () {
      if (this.ready()){
        this.render();
      } else{
        this.render('loading');
      }
    },
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '我的房屋'
      })
    }
  });

  this.route('adminuser', {
    path: '/admin/user/:type/:page',
    parent:'landing',
    label: 'admin_manage_user',
    controller: 'AdminUsersController',
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '管理用户'
      })
    }
  });

  this.route('terms', {
    path: '/pages/terms-conditions',
    template: 'terms',
    parent:'landing',
    label: 'label_terms',
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '网站条例及规范'
      })
    }
  });

  this.route('adminproperty', {
    path: '/admin/property/:type/:page',
    parent:'landing',
    label: 'admin_manage_property',
    controller: 'AdminPropertiesController',
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '管理房屋'
      })
    }
  });

  this.route('properties', {
    path: '/properties/list/:page',
    parent:'landing',
    label: 'label_property_listing',
    controller: 'ListController',
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '房屋列表'
      })
      $(window).scrollTop(0);
    }
  });

  this.route('addProperty', {
    path: '/properties/add',
    parent:'landing',
    label: 'label_publish_property',
    controller: 'AddPropertyController',
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '发布'
      })
    }
  });

  this.route('editProperty', {
    path: '/properties/edit/:id',
    parent:'landing',
    label: 'label_edit_property',
    controller: 'EditPropertyController',
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '编辑'
      })
    }
  });

  this.route('propertyDetail', {
    path: '/property/:id',
    controller: 'PropertyDetailController'
  });

  this.route('sales', {
    path: '/sales/list',
    controller: 'SalesListController',
    onAfterAction: function () {
      document.title = TITLE + ' | ' + '二手产品列表';
    }
  });

  this.route('inbox', {
    path: '/account/inbox',
    template: 'inboxPage',
    parent:'landing',
    label: 'inbox',
    action: function () {
      this.render();
    },
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '收件箱'
      })
    }
  });

  this.route('security', {
    path: '/account/security',
    template: 'securityPage',
    parent:'landing',
    label: 'security',
    action: function () {
      this.render();
    },
    onAfterAction: function () {
      SEO.set({
        title: TITLE + ' | ' + '安全设置'
      })
    }
  });

  this.route('avatar', {
    path: '/account/avatar',
    template: 'uploadAvatar',
    parent:'landing',
    label: 'label_change_avatar',
    action: function () {
      this.render();
    }
    // ,onAfterAction: function () {
    //   SEO.set({
    //     title: TITLE + ' | ' + '修改头像'
    //   })
    // }
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
