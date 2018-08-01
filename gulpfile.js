var gulp = require('gulp');
var sass = require('gulp-sass')
var minifyCSS = require('gulp-clean-css')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var changed = require('gulp-changed')
// var pug = require('gulp-pug');
// var less = require('gulp-less');
// var concat = require('gulp-concat');
// var sourcemaps = require('gulp-sourcemaps');

var SCSS_SRC = './src/Assets/scss/**/*.scss';
var SCSS_DEST = './src/Assets/css';

gulp.task('compile_scss', function() {
  gulp.src(SCSS_SRC)
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(changed(SCSS_DEST))
  .pipe(gulp.dest(SCSS_DEST))
});

gulp.task('watch_scss', function(){
  gulp.watch(SCSS_SRC, ['compile_scss']);
});

// gulp.task('html', function(){
//   return gulp.src('client/templates/*.pug')
//     .pipe(pug())
//     .pipe(gulp.dest('build/html'))
// });
//
// gulp.task('css', function(){
//   return gulp.src('client/templates/*.less')
//     .pipe(less())
//     .pipe(minifyCSS())
//     .pipe(gulp.dest('build/css'))
// });
//
// gulp.task('js', function(){
//   return gulp.src('client/javascript/*.js')
//     .pipe(sourcemaps.init())
//     .pipe(concat('app.min.js'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/js'))
// });

gulp.task('default', [ 'watch_scss' ]);
