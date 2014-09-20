Template.myProperties.rendered = function() {
    render();
}

Template.myProperties.helpers({
  properties: function(){
    var res = Properties.find(
      {author: Meteor.userId()},
      {_id: 1, address:1, price:1, photos:1, createdAt: 1}
    );
    return res || false;
  }

  //TODO: handle no property case
});