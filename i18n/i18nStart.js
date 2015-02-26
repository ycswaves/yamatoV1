var getUserLanguage = function () {
  // Put here the logic for determining the user language
  if(Session.get("language")){
    return Session.get("language");
  } else {
    return "zh";
  }
};

if (Meteor.isClient) {
  Meteor.startup(function () {

    Session.set("showLoadingIndicator", true);

    TAPi18n.setLanguage(getUserLanguage())
      .done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });
  });
}