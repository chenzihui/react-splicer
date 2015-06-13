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
  return del(['app.js'], done);
});

gulp.task('dev', ['clean:dist'], function() {
  var b = _setupBrowserify('./src/index.js'),
      w = watchify(b);

  return w.on('update', function() {
    var time = new Date();

    w.bundle()
      .pipe(plumber())
      .pipe(source('app.js'))
      .pipe(gulp.dest('./'));

    gutil.log(
      'Updated', '\'' + gutil.colors.cyan('js') + '\'');
  }).bundle()
    .pipe(plumber())
    .pipe(source('app.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('webserver', ['dev'], function() {
  return gulp.src('.')
    .pipe(webserver({
      port: 8080
    }));
});

gulp.task('default', ['webserver']);
