var userId;

if(Meteor.users.find().count() < 1){
  userId = Accounts.createUser({
    username: 'ycs',
    email: 'example@gmail.com',
    password: '123456'
  })
}

if(Properties.find().count() < 1){
  var contactInfo = {
    name: 'yi chenshu',
    phone: '96229032',
    qq: null,
    wechat: null,
    email: null
  };

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
      facilities: ['noLandlord', 'aircon']
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
      facilities: ['noLandlord', 'aircon']
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
      facilities: ['washer', 'dryer', 'allowCooking', 'swimmingPool', 'tennisCourt', 'balcony']
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
      facilities: ['washer', 'swimmingPool', 'tennisCourt', 'balcony']
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
      facilities: ['washer', 'balcony']
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
      facilities: ['noLandlord', 'aircon']
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
      facilities: ['noLandlord', 'aircon']
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
      facilities: ['washer', 'dryer', 'allowCooking', 'swimmingPool', 'tennisCourt', 'balcony']
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
      facilities: ['washer', 'swimmingPool', 'tennisCourt', 'balcony']
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
      facilities: ['washer', 'balcony']
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
      facilities: ['noLandlord', 'aircon']
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
      facilities: ['noLandlord', 'aircon']
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
      facilities: ['washer', 'dryer', 'allowCooking', 'swimmingPool', 'tennisCourt', 'balcony']
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
      facilities: ['washer', 'swimmingPool', 'tennisCourt', 'balcony']
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
      facilities: ['washer', 'balcony']
    }

  ];
  formObjArr.forEach(function(e){
    Properties.insert(e);
  })
}