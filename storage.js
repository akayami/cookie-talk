module.exports = function(channel) {

	this.channel = channel;
	this.interval = 1;
	this.buffer = [];
	this.store = localStorage;

	var semaphore = false;
	setInterval(function() {
		if(!semaphore) {
			semaphore = true;
			if(this.buffer.length && !this.store.getItem(this.channel)) {
				var m = this.buffer.shift();
				this.store.setItem(this.channel, m[0]);
				m[1]();
			}
			semaphore = false;
		}
	}.bind(this))

	this.clear = function() {
		this.store.removeItem(this.channel);
	}

	this.send = function(message, cb) {
		this.buffer.push([message, cb]);
	}

	this.onMessage = function(cb) {
		setInterval(function(){
			var m = this.store.getItem(this.channel);
			if(m !== null) {
				this.store.removeItem(this.channel);
				cb(m);
			}
		}.bind(this))
	}
}
