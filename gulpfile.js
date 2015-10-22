var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssminify = require('gulp-minify-css');
var es = require('event-stream');
var copy = require('gulp-copy');



gulp.task('scripts', function() {


	gulp.src([
		'./bower_components/jquery/dist/jquery.js',
		'./bower_components/bootstrap/dist/js/bootstrap.js',
		'./bower_components/angular/angular.js',
		'./bower_components/angular-animate/angular-animate.js',
		'./bower_components/angular-cookies/angular-cookies.js',
		'./bower_components/angular-resource/angular-resource.js',
		'./bower_components/angular-sanitize/angular-sanitize.js',
		'./bower_components/angular-spinkit/build/angular-spinkit.js',
		'./bower_components/angular-ui-router/release/angular-ui-router.js',
		'./src/js/*.js'
	])
		.pipe(sourcemaps.init())
		.pipe(uglify())	
		.pipe(concat('all.min.js'))						
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/js'));
});


gulp.task('styles', function(){


	var vendorcss = gulp.src([
		'./bower_components/bootstrap/dist/css/bootstrap.css',
		'./bower_components/bootstrap/dist/css/bootstrap-theme.css',
		'./bower_components/angular-spinkit/build/angular-spinkit.min.css',
		'./src/css/*.css'
	])
		.pipe(sourcemaps.init())
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('all.min.css'))
        .pipe(cssminify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'));

});

gulp.task('copy-markup', function(){

	return gulp.src([
		'src/index.html'
	])
	.pipe(copy('dist', {prefix:1}));
});



gulp.task('default', ['scripts', 'styles','copy-markup']);