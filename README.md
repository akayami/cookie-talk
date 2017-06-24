# cookie-talk
A lightweight message-exchange protocol for window to window communication on same domain.


## Example
In this example we're going to create 2 html files that are to be open in to browser windows/tabs on the same domain name. 

Whatever you type in each window appears in the other window. Messages are sent through `channels`. Each message is destoryed after being read.

First file:

```
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<title>Window 1</title>
		<script src="cookie-talk.min.js"></script>
	</head>
	<body>
		<div>
		Write Here:
		<textarea id="input"></textarea>
		</div>
		<hr>
		<div>
		Read here:
		<textarea id="output"></textarea>
		</dive>
	</body>
	<script>
		var ct = cookieTalk.storage;
		var channel1 = new ct('channel1');

		var editor = document.getElementById('input');
		editor.addEventListener('keyup', function(e) {
			channel1.send(editor.value, function() {
				//console.log('sent');
			});
		});

		var channel2 = new ct('channel2');
		var monitor = document.getElementById('output');
		channel2.onMessage(function(message) {
			monitor.value = message;
		})
	</script>
</html>
```

And second file
```
<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<title>Window 2</title>
		<script src="cookie-talk.min.js"></script>
	</head>
	<body>
		<div>
		Read here:
		<textarea id="output"></textarea>
		</dive>
		<hr>
		<div>
		Write Here:
		<textarea id="input"></textarea>
		</div>
	</body>
	<script>

		var ct = cookieTalk.factory();
		var channel1 = new ct('channel1');

		var monitor = document.getElementById('output');
		channel1.onMessage(function(message) {
			monitor.value = message;
		})

		var channel2 = new ct('channel2');
		var editor = document.getElementById('input');
		editor.addEventListener('keyup', function(e) {
			channel2.send(editor.value, function() {
			//	console.log('Sent!');
			});
		});
	</script>

</html>
```

Make sure you have `cookie-talk.min.js` readable.

Also make sure your document has:
`<meta charset="utf-8">`
in headers otherwise the minified .js does not work.
