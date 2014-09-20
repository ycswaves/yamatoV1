Properties = new Meteor.Collection("properties");

var Schemas = {};

Schemas.ContactInfo = new SimpleSchema({ //should be consistant with Schema.UserProfile
  name: {
    type: String,
    label: "联系人"
  },
  phone: {
    type: String,
    label: "联系电话",
    regEx: /\d{8}/,
  },
  qq: {
    type: Number,
    label: "QQ号",
    optional: true
  },
  wechat: {
    type: String,
    label: "微信ID或号码",
    optional: true
  },
  email: {
    type: String,
    label: "Email",
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
});

Schemas.Property = new SimpleSchema({
  address: {
    type: String,
    label: "地址"
    //max: 200
  },
  author: {
    type: String,
    label: "帖主"
  },
  price: {
    type: Number,
    label: "价格",
    min: 0
  },
  description: {
    type: String,
    label: "描述",
    optional: true,
    max: 1000
  },
  district: {
    type: String,
    label: "所在区域"
  },
  propertyType: {
    type: String,
    label: "房屋类型",
    allowedValues: ['HDB', 'Condo', 'Landed']
  },
  hasAgentFee: {
    type: Number,
    label: "有无中介费",
    allowedValues: [0, 1]
  },
  rentType: {
    type: Number,
    label: "出租方式",
    allowedValues: [0, 1] // 1 - whole department, 0 - single room
  },
  roomType: {
    type: String,
    label: "出租房间",
    allowedValues: ['master', 'common', 'other']
  },
  moveInDate: {
    type: Date,
    label: "入住时间",
    optional: true
  },
  bedroom: {
    type: Number,
    label: "房间数",
    min: 1
  },
  bathroom: {
    type: Number,
    label: "卫生间数",
    min: 1
  },
  area: {
    type: Number,
    label: "面积",
  },
  mrt: {
    type: String,
    label: "最近地铁站"
  },
  contact: {
    type: Schemas.ContactInfo,
    label: "联系方式"
  },
  photos: {
    type: [String],
    label: "IDs of uploaded photos", // to be revised later
    optional: true
  },
  facilities: {
    type: [String],
    label: "Property facilities"
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
    optional: true // TODO: due to validation, need to set to optional,
                  // otherwise set the value during insertion
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
  status: {
    type: String,
    autoValue: function() {
        if (this.isInsert) {
          return 'open';
        }
      },
    allowedValues: ['open', 'closed', 'deleted'],
    optional: true
  },
  views: {
    type: Number,
    autoValue: function() {
        if (this.isInsert) {
          return 0;
        }
      },
    optional: true
  }
});

Properties.attachSchema(Schemas.Property);