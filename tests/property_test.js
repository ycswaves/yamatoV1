var assert = require('assert');

suite('Property related test', function() {
  test('Should able to validate form with correct fields', function(done, server, client) {
    client.eval(function() {
      var contactInfo = {
          name: 'yi chenshu',
          phone: '96229032',
          qq: null,
          wechat: null,
          email: null
        };

      var formObj = {
        address: '#08-08, Tanameracrest, 8 Pari Dedap Walk',
        author: 'testuser',
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
      };

      var context = Properties.simpleSchema().namedContext('propertyForm');
      context.validate(formObj);
      emit('validate valid form', context.isValid());
    }).once('validate valid form', function(validity) {
       assert.equal(validity, true);
       done();
    });
  });

  test('Should able to invalidate form when "address" is missing', function(done, server, client) {
    client.eval(function() {
      var contactInfo = {
          name: 'yi chenshu',
          phone: '96229032',
          qq: null,
          wechat: null,
          email: null
        };

      var formObj = {
        address: undefined,
        author: 'testuser',
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
      };

      var context = Properties.simpleSchema().namedContext('propertyForm');
      context.validate(formObj);
      emit('validate invalid form', context.isValid());
    }).once('validate invalid form', function(validity) {
       assert.equal(validity, false);
       done();
    });
  });
});
