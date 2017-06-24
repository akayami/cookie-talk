var cookieTalk = {

	cookie: require('./cookie'),

	storage: require('./storage'),

	factory: function(hint) {
		if(hint === 'storage') {
			return this.storage;
		} else if(hint === 'cookie') {
			return this.cookie;
		}

		if(localStorage) {
			return this.storage;
		} else {
			return this.cookie;
		}
	}
}

module.exports = cookieTalk;
