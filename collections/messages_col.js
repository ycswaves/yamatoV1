Messages = new Mongo.Collection("messages");

var Schemas = {};

Schemas.Message = new SimpleSchema({
  topicId: {
    type: String,
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
  }
});

Messages.attachSchema(Schemas.Message);