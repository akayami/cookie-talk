// Fake document cookie construct
const d = {
	cookie: ''
}

var m = require('../index.js').protocol;

var cookie = require('../index.js').cookie(d);

describe('Bunch of tests', function() {

	it('Needs to send data', function(done) {
		var receiver = new m('channel', cookie);
		receiver.onMessage(function(message) {
			console.log(message);
			done();
		});

		var sender = new m('channel', cookie);
		sender.send('Some cookie message');
	})

})
