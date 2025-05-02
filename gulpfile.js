const gulp = require('gulp');
const browserSync = require('browser-sync').create();

function serve() {
	browserSync.init({
		server: {
			baseDir: './src',
		},
	});

	gulp.watch('src/**/*').on('change', browserSync.reload);
}

exports.default = serve;
