var 	gulp     = require('gulp'),
	uglify       = require('gulp-uglify'),
	plumber      = require('gulp-plumber'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	nodemon      = require('gulp-nodemon'),
	browserSync  = require('browser-sync'),
	reload       = browserSync.reload,
	sourcemaps 	 = require('gulp-sourcemaps'),
	minifyCss 	 = require('gulp-minify-css'),
	imagemin     = require('gulp-imagemin');
	pngquant     = require('imagemin-pngquant');
	rename       = require('gulp-rename');
	// jshint = require('gulp-jshints');

// Scripts Task
gulp.task('scripts', function(){
	gulp.src(['public/javascripts/*.js', '!public/javascripts/*.min.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/javascripts/'));
});


// Style Task: Development
gulp.task('sass-dev', function(){
	gulp.src('public/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(reload({ stream: true }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/stylesheets/'))
});

// Style Task: Production
gulp.task('sass-prod', function(){
	gulp.src('public/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass({ style: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(reload({ stream: true }))
		.pipe(minifyCss({ compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/stylesheets/'))
});

gulp.task('browser-sync', function(){
	browserSync.init(null, {
		proxy: 'http://localhost:3333',
				port: 7000,
	});
});


gulp.task('nodemon', function (cb) {
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
			cb();
	});
});

// Template Task
gulp.task('templates', function(){
	gulp.src('views/**/*.jade')
		.pipe(plumber())
		.pipe(reload({ stream: true }))
});

//Image Optimisation
gulp.task('images', function(){
	return gulp.src('public/images/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('public/images/'));
});


// Watch Task
gulp.task('watch', function(){
	gulp.watch('public/javascripts/**/*.js', ['scripts']);
	gulp.watch('public/sass/**/*.scss', ['sass-dev']);
	// gulp.watch('public/images/**/*', ['images']);
	gulp.watch('views/**/*.jade', ['templates']);
});


gulp.task('default', ['browser-sync', 'watch']); 

