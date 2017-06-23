var cookieTalk = require('../index.js')('cookie');

describe('cookie Test (expected to fail chrome if run from file:///, works in ff)', function() {
	require('./common.js')(cookieTalk);
})
