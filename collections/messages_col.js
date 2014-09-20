Messages = new Meteor.Collection("messages");

var Schemas = {};

Schemas.Message = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  referId: {
    type: String,
    label: "原帖ID"
  },
  referType: {
    type: String,
    defaultValue: 'Property',
    allowedValues: ['Property'],
    label: "原帖类型"
  },
  createdAt: {
    type: Date,
    autoValue: function() {
        if (this.isInsert) {
          return new Date;
        } else if (this.isUpsert) {
          return {$setOnInsert: new Date};
        } else {
          this.unset();
        }
      },
    denyUpdate: true,
    optional: true
  }
});

Messages.attachSchema(Schemas.Message);