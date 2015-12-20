var fs = require('fs'),
	request = require('request'),
	path = require('path'),
	exec = require('child_process').exec,
	pathToImg = 'file://' + __dirname  + '/img/image.jpg',
	child;

var download = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
		if (err) {
			console.log('exec error: ' + err);
			return;
		};
		console.log('image download started...');
		request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
	});
};

download('https://source.unsplash.com/random/1920x1080', __dirname + '/img/image.jpg', function(){
	console.log('image was downloaded');

	// This bash  command is changing desktop wallpaper
	child = exec('gsettings set org.gnome.desktop.background picture-uri ' + pathToImg,
		function (error, stdout, stderr) {
			if (error) {
				console.log('exec error: ' + error);
				return
			}
			console.log('wallpaper will change in next session');
	});
});
