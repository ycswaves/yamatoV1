/**
 * messages 
 * { message: String,
 *   style: String,
 *   seen: Boolean }
 */
notificationMessages = new Meteor.Collection(null);

NotificationMessages = {
  // Deprecated, use sendWarning instead. sendWarning is more consistent with Boostrap classes.
  sendAlert: function(title, message, options) {
    sendNotification(title, message, '', options);
    console.log('Deprecated, use sendWarning instead of sendAlert');
  },
  sendWarning: function(title, message, options) {
    sendNotification(title, message, 'alert-warning', options);
  },
  sendError: function(title, message, options) {
    sendNotification(title, message, 'alert-error alert-danger', options);
  },
  sendSuccess: function(title, message, options) {
    sendNotification(title, message, 'notice', options);
  },
  sendInfo: function(title, message, options) {
    sendNotification(title, message, 'reply', options);
  },
  clear: function() {
    notificationMessages.remove({seen: true});
  },
  configure: function(options) {
    this.options = this.options || {};
    _.extend(this.options, options);
  },
  options: {
    // autoHide: true,
    // hideDelay: 3000,
    // autoScroll: true
  }
}

sendNotification = function(title, message, style, options) {
  options = options || {};
  options.autoHide = options.autoHide === undefined ? NotificationMessages.options.autoHide : options.autoHide;
  options.hideDelay = options.hideDelay || NotificationMessages.options.hideDelay;
  notificationMessages.insert({ title: title, message: message, style: style, seen: false, options: options});  
}