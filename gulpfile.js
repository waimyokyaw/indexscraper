const child = require('child_process');
const fs = require('fs');
const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('test', () =>
	gulp.src(['test/**/*.js'], {read: false})
		.pipe(mocha({reporter: 'list', exit: true}))
		.on('error', console.error)
);
gulp.task('server', function() {
	var server = child.spawn('node', ['server.js']);
	var log = fs.createWriteStream('server.log', {flags: 'a'});
	server.stdout.pipe(log);
	server.stderr.pipe(log);
});
gulp.task('default', ['server','test']);  