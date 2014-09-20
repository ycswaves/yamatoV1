Template.inboxPage.rendered = function() {
    render();
}

Template.inboxPage.helpers({
  messages: function(){
    // same as publication
    return Messages.find({}, {sort: {updatedAt: -1}, limit: 5});
  }

});