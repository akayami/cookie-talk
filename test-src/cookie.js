var cookieTalk = require('../index.js').factory('cookie');
//console.log(cookieTalk);

describe('cookie Test (expected to fail chrome if run from file:///, works in ff)', function() {
	require('./common.js')(cookieTalk);
})
