var assert = require('assert');

suite('Router test', function() {
  test('Registered user should able to go to add property page', function(done, server, client) {
    client.eval(function() {
      Accounts.createUser({
        username: 'ycs',
        email: 'example@gmail.com',
        password: '123456'
      });

      Router.go('addProperty');
      waitForDOM('form', function() {
        emit('see the form', true);
      });
    }).once('see the form', function(validity) {
       assert.equal(validity, true);
       done();
    });
  });

  test('Unregistered user should not able to go to pages other than landing page', function(done, server, client) {
    client.eval(function() {
      Router.go('addProperty');
      waitForDOM('div.slogan', function() {
        emit('welcome-message', $('div.slogan h1').text());
      });
    }).once('welcome-message', function(text) {
       assert.equal(text, '寻找属于你的那个家。');
       done();
    });
  });
});
