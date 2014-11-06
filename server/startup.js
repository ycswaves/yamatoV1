
var createDummyPosts = function(userId, username){
    var contactInfo = {
      name: username,
      phone: '96229032',
      qq: '456785213',
      wechat: null,
      email: null
    }; //TODO: use different contact to differentiate

    var formObjArr = [
      {
        address: '#08-08, Tanameracrest, 8 Pari Dedap Walk',
        author: userId,
        price: 3200,
        description: 'no description',
        district: 'D16',
        propertyType: 'Condo',
        hasAgentFee: 0,
        roomType: 'master',
        rentType: 0,
        moveInDate: new Date(),
        bedroom: 3,
        area: 112,
        bathroom: 3,
        mrt: 'EW4',
        contact: contactInfo,
        photos: [],
        facilities: ['noLandlord', 'aircon'],
        map: {latitude: 1.3325658, longitude: 103.9421344}
      },

      {
        address: '#07-18, Bedok South Ave 3',
        author: userId,
        price: 1200,
        description: 'no description',
        district: 'D16',
        propertyType: 'Condo',
        hasAgentFee: 0,
        roomType: 'master',
        rentType: 0,
        moveInDate: new Date(),
        bedroom: 3,
        area: 112,
        bathroom: 3,
        mrt: 'EW4',
        contact: contactInfo,
        photos: [],
        facilities: ['noLandlord', 'aircon'],
        map: {latitude: 1.313971, longitude: 103.9241629}
      },

      {
        address: '7a kovan rd',
        author: userId,
        price: 1500,
        description: '高文全新的豪华公寓，距离MRT仅用30秒，在窗户就能看到脚下的MRT STATION。距离博伟走路仅需2分钟，再也不用担心迟到了',
        district: 'D08',
        propertyType: 'Condo',
        hasAgentFee: 0,
        roomType: 'common',
        rentType: 0,
        moveInDate: new Date(),
        bedroom: 3,
        area: 138,
        bathroom: 3,
        mrt: 'NE13',
        contact: contactInfo,
        photos: [],
        facilities: ['washer', 'dryer', 'allowCooking', 'swimmingPool', 'tennisCourt', 'balcony'],
        map: {latitude: 1.359667, longitude: 103.883693}
      },

      {
        address: 'river valley kim Yam',
        author: userId,
        price: 4100,
        description: '',
        district: 'D08',
        propertyType: 'HDB',
        hasAgentFee: 1,
        roomType: 'common',
        rentType: 1,
        moveInDate: new Date(),
        bedroom: 3,
        area: 108,
        bathroom: 2,
        mrt: 'NS23',
        contact: contactInfo,
        photos: [],
        facilities: ['washer', 'swimmingPool', 'tennisCourt', 'balcony'],
        map: {latitude: 1.296126, longitude: 103.838337}
      },

      {
        address: '770 BEDOK RESERVOIR ROAD',
        author: userId,
        price: 2200,
        description: '',
        district: 'D16',
        propertyType: 'Landed',
        hasAgentFee: 1,
        roomType: 'common',
        rentType: 1,
        moveInDate: new Date(),
        bedroom: 7,
        area: 308,
        bathroom: 4,
        mrt: 'EW5',
        contact: contactInfo,
        photos: [],
        facilities: ['washer', 'balcony'],
        map: {latitude: 1.3338199, longitude: 103.9150453}
      },

      {
        address: '#07-08, Tanameracrest, 8 Pari Dedap Walk',
        author: userId,
        price: 3200,
        description: 'no description',
        district: 'D16',
        propertyType: 'Condo',
        hasAgentFee: 0,
        roomType: 'master',
        rentType: 0,
        moveInDate: new Date(),
        bedroom: 3,
        area: 112,
        bathroom: 3,
        mrt: 'EW4',
        contact: contactInfo,
        photos: [],
        facilities: ['noLandlord', 'aircon'],
        map: {latitude: 1.3325658, longitude: 103.9421344}
      },

      {
        address: '#07-28, Bedok South Ave 3',
        author: userId,
        price: 1200,
        description: 'no description',
        district: 'D16',
        propertyType: 'Condo',
        hasAgentFee: 0,
        roomType: 'master',
        rentType: 0,
        moveInDate: new Date(),
        bedroom: 3,
        area: 112,
        bathroom: 3,
        mrt: 'EW4',
        contact: contactInfo,
        photos: [],
        facilities: ['noLandlord', 'aircon'],
        map: {latitude: 1.313971, longitude: 103.9241629}
      },

      {
        address: '9a kovan Ave',
        author: userId,
        price: 1500,
        description: '高文全新的豪华公寓，距离MRT仅用30秒，在窗户就能看到脚下的MRT STATION。距离博伟走路仅需2分钟，再也不用担心迟到了',
        district: 'D08',
        propertyType: 'Condo',
        hasAgentFee: 0,
        roomType: 'common',
        rentType: 0,
        moveInDate: new Date(),
        bedroom: 3,
        area: 138,
        bathroom: 3,
        mrt: 'NE13',
        contact: contactInfo,
        photos: [],
        facilities: ['washer', 'dryer', 'allowCooking', 'swimmingPool', 'tennisCourt', 'balcony'],
        map: {latitude: 1.359667, longitude: 103.883693}
      },

      {
        address: 'River valley Tan Yam',
        author: userId,
        price: 4100,
        description: '',
        district: 'D08',
        propertyType: 'HDB',
        hasAgentFee: 1,
        roomType: 'common',
        rentType: 1,
        moveInDate: new Date(),
        bedroom: 3,
        area: 108,
        bathroom: 2,
        mrt: 'NS23',
        contact: contactInfo,
        photos: [],
        facilities: ['washer', 'swimmingPool', 'tennisCourt', 'balcony'],
        map: {latitude: 1.296126, longitude: 103.838337}
      },

      {
        address: '707 BEDOK RESERVOIR ROAD',
        author: userId,
        price: 2200,
        description: '',
        district: 'D16',
        propertyType: 'Landed',
        hasAgentFee: 1,
        roomType: 'common',
        rentType: 1,
        moveInDate: new Date(),
        bedroom: 7,
        area: 308,
        bathroom: 4,
        mrt: 'EW5',
        contact: contactInfo,
        photos: [],
        facilities: ['washer', 'balcony'],
        map: {latitude: 1.3338199, longitude: 103.9150453}
      },

      {
        address: '#03-18, Tanameracrest, 7 Pari Dedap Walk',
        author: userId,
        price: 3200,
        description: 'no description',
        district: 'D16',
        propertyType: 'Condo',
        hasAgentFee: 0,
        roomType: 'master',
        rentType: 0,
        moveInDate: new Date(),
        bedroom: 3,
        area: 112,
        bathroom: 3,
        mrt: 'EW4',
        contact: contactInfo,
        photos: [],
        facilities: ['noLandlord', 'aircon'],
        map: {latitude: 1.3338199, longitude: 103.9150453}
      },

      {
        address: '#03-08, Bedok North Ave 3',
        author: userId,
        price: 1200,
        description: 'no description',
        district: 'D16',
        propertyType: 'Condo',
        hasAgentFee: 0,
        roomType: 'master',
        rentType: 0,
        moveInDate: new Date(),
        bedroom: 3,
        area: 112,
        bathroom: 3,
        mrt: 'EW4',
        contact: contactInfo,
        photos: [],
        facilities: ['noLandlord', 'aircon'],
        map: {latitude: 1.3311249, longitude: 103.9355457}
      },

      {
        address: '7A Kovan Road',
        author: userId,
        price: 1500,
        description: '高文全新的豪华公寓，距离MRT仅用30秒，在窗户就能看到脚下的MRT STATION。距离博伟走路仅需2分钟，再也不用担心迟到了',
        district: 'D08',
        propertyType: 'Condo',
        hasAgentFee: 0,
        roomType: 'common',
        rentType: 0,
        moveInDate: new Date(),
        bedroom: 3,
        area: 138,
        bathroom: 3,
        mrt: 'NE13',
        contact: contactInfo,
        photos: [],
        facilities: ['washer', 'dryer', 'allowCooking', 'swimmingPool', 'tennisCourt', 'balcony'],
        map: {latitude: 1.359667, longitude: 103.883693}
      },

      {
        address: 'River valley Yeo Kim',
        author: userId,
        price: 4100,
        description: '',
        district: 'D08',
        propertyType: 'HDB',
        hasAgentFee: 1,
        roomType: 'common',
        rentType: 1,
        moveInDate: new Date(),
        bedroom: 3,
        area: 108,
        bathroom: 2,
        mrt: 'NS23',
        contact: contactInfo,
        photos: [],
        facilities: ['washer', 'swimmingPool', 'tennisCourt', 'balcony'],
        map: {latitude: 1.296126, longitude: 103.838337}
      },

      {
        address: '771 BEDOK RESERVOIR ROAD',
        author: userId,
        price: 2200,
        description: '',
        district: 'D16',
        propertyType: 'Landed',
        hasAgentFee: 1,
        roomType: 'common',
        rentType: 1,
        moveInDate: new Date(),
        bedroom: 7,
        area: 308,
        bathroom: 4,
        mrt: 'EW5',
        contact: contactInfo,
        photos: [],
        facilities: ['washer', 'balcony'],
        map: {latitude: 1.3338199, longitude: 103.9150453}
      }

    ];
    formObjArr.forEach(function(e){
      Properties.insert(e);
    });
}

if(Meteor.users.find().count() < 1){
  userId = Accounts.createUser({
    username: 'ycs',
    email: 'ycs@gmail.com',
    password: '123456'
  });
  createDummyPosts(userId, 'Yi Chenshu');

  userId2 = Accounts.createUser({
    username: 'batman',
    email: 'batman@gmail.com',
    password: '123456'
  });
  createDummyPosts(userId2, 'Bruce Wayne');

  userId3 = Accounts.createUser({
    username: 'superman',
    email: 'superman@gmail.com',
    password: '123456'
  });
  createDummyPosts(userId3, 'Clark Kent');

  userId4 = Accounts.createUser({
    username: 'ironman',
    email: 'ironman@gmail.com',
    password: '123456'
  });
  createDummyPosts(userId4, 'Tony Stark');
}

