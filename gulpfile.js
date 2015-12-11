var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');

gulp.task('default', function () {
    var patterns = ['./src/*.js'];
    gulp.watch(patterns, ['client-transpile-merge-compress']);
});

gulp.task('client-transpile-merge-compress', function() {
    browserify()
        .add('./src/main.js')
        .transform(babelify)
        .bundle()
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});