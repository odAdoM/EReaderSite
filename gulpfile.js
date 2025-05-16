import gulp from 'gulp';
import browserSync from 'browser-sync';
import del from 'del';
import sass from 'gulp-dart-sass';
import { rollup } from 'rollup';
import rollupConfig from './rollup.config.js';
import cleanCSS from 'gulp-clean-css';
import minimist from 'minimist';
import gulpIf from 'gulp-if';

const { src, dest, watch, series, parallel } = gulp;
const bs = browserSync.create();

const options = minimist(process.argv.slice(2));
const isProd = options.prod === true;

const paths = {
	html: 'src/**/*.html',
	sass: 'src/sass/**/*.scss',
	cssDest: 'dist/css',
	img: 'src/images/**/*',
	imgDest: 'dist/images',
	jsWatch: 'src/js/**/*.js',
	dist: 'dist',
};

export const clean = () => del([paths.dist]);

export function styles() {
	return (
		src(['src/sass/**/*.scss', '!src/sass/**/_*.scss'])
			.pipe(sass().on('error', sass.logError))
			.pipe(gulpIf(isProd, cleanCSS()))
			.pipe(dest(paths.cssDest))
			// .pipe(bs.stream({ match: '**/*.css' }));
			.on('end', () => bs.reload())
	);
}

export function html() {
	return src(paths.html).pipe(dest(paths.dist)).pipe(bs.stream());
}

export function images() {
	return src(paths.img).pipe(dest(paths.imgDest));
}

export async function js() {
	process.env.BUILD = isProd ? 'production' : 'development';

	for (const config of rollupConfig) {
		const bundle = await rollup(config);
		await bundle.write(config.output);
	}
	bs.reload();
}

export function serve() {
	bs.init({
		server: {
			baseDir: paths.dist,
		},
	});

	watch(paths.sass, styles);
	watch(paths.html, html);
	watch(paths.img, images);
	watch(paths.jsWatch, series(js));
}

export const build = series(clean, parallel(styles, html, images, js));
export default series(build, serve);
