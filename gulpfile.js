// const gulp = require('gulp');
// const browserSync = require('browser-sync').create();

// function serve() {
// 	browserSync.init({
// 		server: {
// 			baseDir: './src',
// 		},
// 	});

// 	gulp.watch('src/**/*').on('change', browserSync.reload);
// }

// exports.default = serve;

//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//-------------------------|    browserify     |-----------------------------

// const gulp = require('gulp');
// const browserify = require('browserify');
// const source = require('vinyl-source-stream');
// const babelify = require('babelify');
// const browserSync = require('browser-sync').create();
// const fs = require('fs');
// const path = require('path');
// const sass = require('gulp-dart-sass');

// const paths = {
// 	entriesDir: 'src/js/entries',
// 	bundlesDir: 'src/js/bundles',
// 	sassDir: 'src/sass/**/*.scss',
// 	cssDir: 'src/css',
// 	html: {
// 		watch: 'src/**/*.html',
// 	},
// };

// function getEntryPoints() {
// 	return fs
// 		.readdirSync(paths.entriesDir)
// 		.filter((file) => file.endsWith('.js') && fs.statSync(path.join(paths.entriesDir, file)).isFile())
// 		.map((file) => file.replace('.js', ''));
// }

// function scripts() {
// 	const entries = getEntryPoints();

// 	return Promise.all(
// 		entries.map((entry) => {
// 			return browserify({
// 				entries: path.join(paths.entriesDir, `${entry}.js`),
// 				debug: true,
// 			})
// 				.transform(babelify, {
// 					presets: ['@babel/preset-env'],
// 					sourceMaps: true,
// 				})
// 				.bundle()
// 				.pipe(source(`bundle-${entry}.js`))
// 				.pipe(gulp.dest(paths.bundlesDir))
// 				.pipe(browserSync.stream());
// 		})
// 	);
// }

// function styles() {
// 	return gulp
// 		.src(paths.sassDir)
// 		.pipe(sass().on('error', sass.logError))
// 		.pipe(gulp.dest(paths.cssDir))
// 		.pipe(browserSync.stream());
// }

// function serve() {
// 	browserSync.init({
// 		server: {
// 			baseDir: './src',
// 		},
// 	});

// 	gulp.watch(['src/js/entries/**/*.js'], scripts);
// 	gulp.watch(paths.sassDir, styles);
// 	gulp.watch(paths.html.watch).on('change', browserSync.reload);
// }

// exports.default = gulp.series(scripts, styles, serve);

//----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------
//-------------------------|    browserify + sass     |-----------------------------

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-dart-sass');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babelify = require('babelify');
const del = require('del');
const fs = require('fs');
const path = require('path');

const paths = {
	html: 'src/**/*.html',
	sass: 'src/sass/**/*.scss',
	jsPages: 'src/js/pages/**/*.js',
	jsDest: 'dist/js/pages',
	cssDest: 'dist/css',
	img: 'src/images/**/*',
	dist: 'dist',
	imgDest: 'dist/images',
};

function clean() {
	return del([paths.dist]);
}

function styles() {
	return gulp
		.src(paths.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.cssDest))
		.pipe(browserSync.stream());
}

function scripts() {
	const jsFiles = fs.readdirSync('./src/js/pages/');

	const tasks = jsFiles.map((file) => {
		const filePath = path.join('src/js/pages', file);

		return browserify({ entries: [filePath], debug: true })
			.transform(babelify, { presets: ['@babel/preset-env'], sourceMaps: true })
			.bundle()
			.on('error', function (err) {
				console.error('JS BUNDLE ERROR:', err.message);
				this.emit('end');
			})
			.pipe(source(file))
			.pipe(buffer())
			.pipe(gulp.dest(paths.jsDest))
			.pipe(browserSync.stream());
	});

	return Promise.all(tasks);
}

function html() {
	return gulp.src(paths.html).pipe(gulp.dest(paths.dist)).pipe(browserSync.stream());
}

function images() {
	return gulp.src(paths.img).pipe(gulp.dest(paths.imgDest));
}

function serve() {
	browserSync.init({
		server: {
			baseDir: paths.dist,
		},
	});

	gulp.watch(paths.sass, styles);
	gulp.watch(paths.jsPages, scripts);
	gulp.watch(paths.html, html);
	gulp.watch(paths.img, images);
}

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;

exports.build = gulp.series(clean, gulp.parallel(styles, scripts, html, images));

exports.default = gulp.series(exports.build, serve);
