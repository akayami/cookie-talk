module.exports = function(hint) {
	if(hint === 'storage') {
		return require('./storage');
	} else if(hint === 'cookie') {
		return require('./cookie');
	}

	if(localStorage) {
		return require('./storage');
	} else {
		return require('./cookie')
	}
}
