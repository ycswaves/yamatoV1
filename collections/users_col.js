Schema = {};

Schema.UserProfile = new SimpleSchema({
    name: {
        type: String,
        label: "Full name",
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    phone: {
        type: String,
        label: "Phone number",
        regEx: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/, //TODO: US format, need to update
        optional: true
    },
    qq: {
        type: Number,
        label: "QQ number",
        optional: true
    },
    wechat: {
        type: String,
        label: "Wechat number, can be number or string",
        optional: true
    },
    about: {
        type: String,
        label: "About me",
        optional: true
    },
    agency : {
        type: String,
        label: "Agency name, should be in the agency list",
        optional: true
    }
});

Schema.User = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    emails: {
        type: [Object]
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
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
      denyUpdate: true
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
    },
    roles: {
      type: String,
      defaultValue: 'Normal',
      allowedValues: ['Normal', 'Agent', 'Admin']
    },
    isActive: {
      type: Boolean,
      defaultValue: true
    },
    isAcceptNewsletter: {
      type: Boolean,
      defaultValue: false
    }
});

Meteor.users.attachSchema(Schema.User);