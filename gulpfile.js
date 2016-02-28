var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
const ts = require('gulp-typescript');
const tsify = require('tsify');
const notify = require("gulp-notify");

gulp.task('default', function () {
    var patterns = ['./src/*.ts'];
    gulp.watch(patterns, ['ts-transpile-merge-compress']);
});

gulp.task('ts-transpile-merge-compress', () => {
    browserify()
        .add('typings/tsd.d.ts')
         .add('src/main.ts')
        .plugin(tsify, {target: 'es5', module: 'commonjs', noLib: true})

         //.transform(babelify, {presets: ["es2015"], extensions: ['.js', '.json']})
         //.add('src/main.js')
         .bundle()
         .on('error', error => console.error(error.toString()))
         .pipe(source('script.js'))
        //   .pipe(buffer())
        //   .pipe(uglify())
        //// uglifyjs -m -c --screw-ie8 -o js/script.js -- js/script.js
         .pipe(gulp.dest('./'))
         .pipe(notify("Bundling complete!"))
         ;
});