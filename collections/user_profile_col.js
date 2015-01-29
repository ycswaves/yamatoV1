UserProfiles = new Mongo.Collection("userProfiles");

var Schema = {};

Schema.UserProfile = new SimpleSchema({
  userid: {
    type: String,
    label: "user ID"
  },
  name: {
    type: String,
    label: "Full name",
    optional: true
  },
  avatar: {
    type: String,
    label: "avatar img link",
    optional: true
  },
  phone: {
    type: String,
    label: "电话号码",
    regEx: /\d{8}/,
    optional: true
  },
  qq: {
    type: String,
    label: "QQ号",
    regEx: /\d+/,
    optional: true
  },
  wechat: {
    type: String,
    label: "微信ID或号码",
    optional: true
  },
  about: {
    type: String,
    label: "self description",
    optional: true
  },
  privilege: {
    type: Number,
    autoValue: function() {
        if (this.isInsert) {
          return 1;
        }
      },
    label: "user privilege"
  }
  // isAgent: {
  //   type: Boolean,
  //   label: "if user is an agent"
  // }
});

UserProfiles.attachSchema(Schema.UserProfile);