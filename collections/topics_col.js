Topics = new Mongo.Collection("topics");

var Schemas = {};

Schemas.Topic = new SimpleSchema({
  creator: {
    type: String,
    label: "创建者ID"
  },
  chatWith: {
    type: String,
    label: "对象ID"
  },
  referId: {
    type: String,
    label: "原帖ID",
    optional: true
  },
  referType: {
    type: String,
    defaultValue: 'Property',
    allowedValues: ['Property','System','Common'],
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
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
        if (this.isInsert) {
          return new Date;
        }
    },
    optional: true
  }
});

Topics.attachSchema(Schemas.Topic);