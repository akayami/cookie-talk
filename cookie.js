var c = require('./lib/cookie');
var Base64 = require('js-base64').Base64;


module.exports = function(channel) {

	this.channel = channel;
	this.cookie = c;
	this.interval = 1;


	this.send = function(message, cb) {
		this.cookie.erase(this.channel);
		message = Base64.encode(message);
		var chunk = 1000;
		var c = 0;
		var i = setInterval(function() {
			var tmp = this.cookie.read(this.channel);
			if(!tmp) {
				var piece = String(message).substring(c * chunk, (c + 1) * chunk);
				this.cookie.create(this.channel, piece);
				if(message.length <= (c + 1) * chunk) {
					this.cookie.create(this.channel + '-ack', true);
					clearInterval(i);
					cb();
				} else {
					c++;
				}
			}
		}.bind(this), this.interval)
	}

	this.clear = function() {
		this.cookie.erase(this.channel);
	}

	this.onMessage = function(cb) {
		var buffer = [];
		var i = setInterval(function(){
			var x = this.cookie.read(this.channel);
			if(x) {
				buffer.push(x);
				this.cookie.erase(this.channel);
			} else {
				if(this.cookie.read(this.channel + '-ack')) {
					this.cookie.erase(this.channel + '-ack');
					cb(Base64.decode(buffer.join()));
					buffer = [];
				}
			}
		}.bind(this), this.interval)
	}

}
