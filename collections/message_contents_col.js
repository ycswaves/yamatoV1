MessageContents = new Meteor.Collection("message_contents");

var Schemas = {};

Schemas.MessageContent = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  messageId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: "消息主题ID"
  },
  owner: {
    type: String,
    label: "信息拥有者"
  },
  sender: {
    type: String,
    label: "发送者ID"
  },
  receiver: {
    type: String,
    label: "接收者ID"
  },
  content: {
    type: String,
    label: "内容"
  },
  isRead: {
    type: Boolean,
    defaultValue: false
  },
  isValid: {
    type: Boolean,
    defaultValue: true
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
        if (this.isUpdate) {
          return new Date();
        }
      },
    denyInsert: true,
    optional: true
  }
});

MessageContents.attachSchema(Schemas.MessageContent);