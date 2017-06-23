
module.exports = function(cookieTalk) {
	it('Can to send a message', function(done) {
		var o = new cookieTalk('channel');
		o.clear();
		o.send('test', function() {
			return done();
		});
	})

	it('Can to send & read a message', function(done) {
		var o = new cookieTalk('channel');
		o.clear();
		o.onMessage(function(m) {
			if(m === 'test') {
				return done();
			}
		})
		o.send('test', function() {

		});
	})
}
