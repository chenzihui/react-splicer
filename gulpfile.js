var gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    plumber    = require('gulp-plumber'),
    webserver  = require('gulp-webserver'),
    source     = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify   = require('watchify'),
    babelify   = require('babelify'),
    del        = require('del');

function _setupBrowserify(path, debug) {
  var b = browserify({
    entries: [path],
    transform: [babelify],
    debug: debug,
    cache: {}, packageCache: {}, fullPaths: true
  });

  return b;
}

gulp.task('clean:dist', function(done) {
  return del(['dist'], done);
});

gulp.task('clean:example', function(done) {
  return del(['example/app.js'], done);
});

gulp.task('example:dev', ['clean:example'], function() {
  var b = _setupBrowserify('./example/js/app.js'),
      w = watchify(b);

  return w.on('update', function() {
    var time = new Date();

    w.bundle()
      .pipe(plumber())
      .pipe(source('app.js'))
      .pipe(gulp.dest('./example/'));

    gutil.log(
      'Updated', '\'' + gutil.colors.cyan('js') + '\'');
  }).bundle()
    .pipe(plumber())
    .pipe(source('app.js'))
    .pipe(gulp.dest('./example/'));
});

gulp.task('webserver', ['example:dev'], function() {
  return gulp.src('./example/')
    .pipe(webserver({
      port: 8080
    }));
});
