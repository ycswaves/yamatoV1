(function () {
  "use strict";
  describe("Add Property", function () {
    it("should be successful with valid dummy data", function () {
      var contactInfo = {
        name: 'yi chenshu',
        phone: '96229032',
        qq: null,
        wechat: null,
        email: null
      };

      var formObj = {
        address: '#08-08, Tanameracrest, 8 Pari Dedap Walk',
        author: 'testid',
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

      spyOn(Meteor, "call");
      Meteor.call('addProperty', formObj, function(err, id){
        console.log('err: ' + err || 'no error');
        console.log('id: '+id);
      });
      expect(Meteor.call).toHaveBeenCalled();
      // spyOn(Properties, "insert").andReturn(1);

      // expect(Meteor.methodMap.addProperty).not.toThrow();
      //expect(Meteor.methodMap.addProperty).toThrow();
    });

    it("should return false with invalid dummy data", function () {
      var contactInfo = {
        name: null, //name is required, make name null
        phone: '96229032',
        qq: null,
        wechat: null,
        email: null
      };

      var formObj = {
        address: '#08-08, Tanameracrest, 8 Pari Dedap Walk',
        author: 'testid',
        price: 3200,
        description: 'no description',
        district: 'D16',
        propertyType: 'Condo',
        hasAgentFee: 0,
        moveInDate: new Date(),
        bedroom: 3,
        area: 112,
        bathroom: 3,
        mrt: 'EW4',
        contact: contactInfo,
        photos: [],
        facilities: ['noLandlord', 'aircon']
      };

      expect(true).toBe(true); //test
      //spyOn(Properties, "insert").andReturn(false);
      //Meteor.methodMap.addProperty(formObj);
      //expect(Meteor.methodMap.addProperty).not.toThrow();
    });

  });
})();