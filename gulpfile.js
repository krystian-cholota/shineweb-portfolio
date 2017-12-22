// Load modules
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require('gulp-autoprefixer'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	changed = require('gulp-changed'),
	htmlReaplce = require('gulp-html-replace'),
	htmlMin = require('gulp-htmlmin'),
	del = require('del'),
	sequence = require('run-sequence');

// config
var config = {
	dist: 'dist/',
	src: 'src/',
	
	in:
	{
		css: 'src/css/**/*.css',
		js: 'src/js/*.js',
		js_plugins: 'src/js/plugins/*.js',
		img: 'src/images/**/*.{jpg,jpeg,png,gif,ico,svg}',
		font: 'src/fonts/**/*.*',
		php: 'src/php/**/*.php',
		index: 'src/*.php',
		scss: 'src/scss/**/*.scss',
		portfolio: 'src/portfolio/**/*.html'
	},

	out:
	{
		css: 'dist/css/',
		js: 'dist/js/',
		js_plugins: 'dist/js/plugins',
		img: 'dist/images/',
		font: 'dist/fonts/',
		php: 'dist/php',
		index: 'dist/',
		scss: 'src/css/',
		css_name: 'style.css',
		js_name: 'main.min.js',
		css_replace: 'css/style.css',
		js_replace: 'js/main.min.js',
		portfolio: 'dist/portfolio'
	}
};

gulp.task('reload', function() {
	browserSync.reload();
});

gulp.task('serve', ['sass'], function() {
	browserSync.init({
        proxy: 'local.shineweb/' + config.src
    });

	gulp.watch([config.in.index, config.in.js], ['reload']);
	gulp.watch(config.in.scss, ['sass']);
});

// SCSS task
gulp.task('sass', function() {
	return gulp.src(config.in.scss)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 3 versions']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.out.scss))
		.pipe(browserSync.stream());
});

// CSS task
gulp.task('css', function() {
	return gulp.src(config.in.css)
		.pipe(concat(config.out.css_name))
		.pipe(cleanCSS())
		.pipe(gulp.dest(config.out.css));
});

// JS task
gulp.task('js', function() {
	return gulp.src(config.in.js)
		.pipe(concat(config.out.js_name))
		.pipe(uglify())
		.pipe(gulp.dest(config.out.js));
});
// JS add plugins folder
gulp.task('js-plugins', function() {
	return gulp.src(config.in.js_plugins)
		.pipe(gulp.dest(config.out.js_plugins));
});

// Images
gulp.task('img', function() {
	return gulp.src(config.in.img)
		.pipe(changed(config.out.img))
		.pipe(imagemin())
		.pipe(gulp.dest(config.out.img));
});

// Fonts
gulp.task('fonts', function() {
	return gulp.src(config.in.font)
		.pipe(gulp.dest(config.out.font));
});

// PHP
gulp.task('php', function() {
	return gulp.src(config.in.php)
		.pipe(gulp.dest(config.out.php));
});

// HTML
gulp.task('html', function() {
	return gulp.src(config.in.index)
		.pipe(htmlReaplce({
			'css': config.out.css_replace,
			'js': config.out.js_replace
		}))
		.pipe(gulp.dest(config.dist))
});

// Add portfolio folder
gulp.task('portfolio', function() {
	return gulp.src(config.in.portfolio)
		.pipe(gulp.dest(config.out.portfolio));
});

// Clean task
gulp.task('clean', function() {
	return del([config.dist]);
});

// Build task
gulp.task('build', function() {
	sequence('clean', ['html', 'js', 'js-plugins', 'css', 'img', 'fonts', 'php', 'portfolio']);
});

gulp.task('default', ['serve']);