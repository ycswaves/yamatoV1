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
    }
  ];
  formObjArr.forEach(function(e){
    Properties.insert(e);
  })
}