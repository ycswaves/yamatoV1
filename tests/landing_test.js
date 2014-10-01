var assert = require('assert');

suite('Landing page', function() {
  test('Should load for unauthenticated users', function(done, server, client) {
    client.eval(function() {
      waitForDOM('div.slogan', function() {
        emit('welcome-message', $('div.slogan h1').text());
      });
    }).once('welcome-message', function(text) {
       assert.equal(text, '寻找属于你的那个家。');
       done();
    });
  });
});
