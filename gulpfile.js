/**
 * @fileOverview
 * @author ISS
 */

var gulp = require('gulp'),
  stylus = require('gulp-stylus'),
  angularFilesort = require('gulp-angular-filesort'),
  inject = require('gulp-inject'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  wiredep = require('wiredep').stream,
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

gulp.task('stylus', function () {
  return gulp
    .src('./src/client/styles/*.styl')
    .pipe(stylus({
      comoress: false,
      'include css': true
    }))
    .pipe(gulp.dest('./src/client/app/_tmp'))
});

gulp.task('inject', function () {
  var cssSources = gulp.src(['./src/client/app/_tmp/*.css']),
    jsSources = gulp.src(['./src/client/app/**/*.js', '!./src/client/app/bower_components/**/*.js'])
      .pipe(angularFilesort()),
    cssOptions = {
      ignorePath: '/src/client/app',
      addPrefix: './app',
      addRootSlash: false
    },
    jsOptions = {
      ignorePath: '/src/client/app',
      addPrefix: './app',
      addRootSlash: false
    };
  gulp.src('./src/client/index.html')
    .pipe(inject(jsSources, jsOptions))
    .pipe(inject(cssSources, cssOptions))
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest('./src/client'));
});

gulp.task('serve', function () {
  gulp.watch('./src/client/app/**/*.html').on('change', reload);
  gulp.watch('./src/client/styles/*.styl', ['stylus']);
  gulp.watch('./src/client/app/**/*.js', ['concatUglify']);
});

gulp.task('default', ['inject', 'stylus', 'serve']);