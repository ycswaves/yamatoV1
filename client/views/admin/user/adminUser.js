Template.adminUser.rendered = function() {
  render();
}

AdminUsersController = RouteController.extend({
  template: 'adminUser',
  action: function () {
    if (this.ready()){
      this.render();
    } else{
      this.render('loading');
    }
  },
  data: function () {
    
  }
});