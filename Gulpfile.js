var gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('sass', function () {
	gulp.src('scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('css'));
});

gulp.task('styles', function() {
  return gulp.src('sass/*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('clean', function(cb) {
    del(['css', 'js', 'images'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles');
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('sass/**/*.scss', ['styles']);
  // Watch .js files
  // gulp.watch('src/scripts/**/*.js', ['scripts']);
  // Watch image files
  // gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['css/**']).on('change', livereload.changed);
});