var gulp = require('gulp');
var source = require('vinyl-source-stream'); // Used to stream bundle for further handling
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var babelify = require('babelify');
var notify = require('gulp-notify');
var gutil = require('gulp-util');
var glob = require('glob');

var dependencies = [
  'react',
  'flux-react'
];

var browserifyTask = function (options) {

  if (options.development) {

    var testFiles = glob.sync('./specs/**/*-spec.js');
    var testBundler = browserify({
      entries: testFiles,
      debug: true, // Gives us sourcemapping
      transform: [babelify, reactify],
      cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
    });

    testBundler.external(dependencies);

    var rebundleTests = function () {
      var start = Date.now();
      console.log('Building TEST bundle');
      testBundler.bundle()
        .on('error', gutil.log)
        .pipe(source('specs.js'))
        .pipe(gulp.dest(options.dest))
        .pipe(notify(function () {
          console.log('TEST bundle built in ' + (Date.now() - start) + 'ms');
        }));
    };

    testBundler = watchify(testBundler);
    testBundler.on('update', rebundleTests);
    rebundleTests();

    var vendorsBundler = browserify({
      debug: true,
      require: dependencies
    });

    // Run the vendor bundle
    var start = new Date();
    console.log('Building VENDORS bundle');
    vendorsBundler.bundle()
      .on('error', gutil.log)
      .pipe(source('vendors.js'))
      .pipe(gulp.dest(options.dest))
      .pipe(notify(function () {
        console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
      }));

  }
};

gulp.task('default', function() {
  browserifyTask({
    development: true,
    dest: './tests'
  })
});
