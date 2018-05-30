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
  modRewrite = require('connect-modrewrite'),
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
  var cssSources = gulp.src(['./src/client/app/_tmp/*.css', '!./src/client/app/bower_components/**/*.css']),
    moduleSources = gulp.src(['./src/client/app/**/*.module.js']),
    jsSources = gulp.src(['./src/client/app/**/*.js', '!./src/client/app/**/*.module.js', '!./src/client/app/bower_components/**/*.js'])
      .pipe(angularFilesort()),
    cssOptions = {
      ignorePath: '/src/client/app',
      addPrefix: './app',
      addRootSlash: false
    },
    moduleOptions = {
      name: 'module',
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
    .pipe(inject(moduleSources, moduleOptions))
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
  //gulp.watch('./src/client/app/**/*.js', ['concatUglify']);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./src/client",
      index: 'index.html'
    },
    port: 8580,
    //解決刷新404
    middleware: [
      modRewrite([
        '^/users\\S* /index.html [L]',
        '^/article\\S* /index.html [L]'
      ])
    ]
  });
});

gulp.task('default', ['browser-sync', 'inject', 'stylus', 'serve']);