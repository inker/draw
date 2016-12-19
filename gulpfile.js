const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const ts = require('gulp-typescript');
const tsify = require('tsify');
const notify = require("gulp-notify");

gulp.task('default', function () {
    var patterns = ['./src/*.ts', './src/gs/*.ts', './src/last16/*.ts'];
    gulp.watch(patterns, ['ts-transpile-merge-compress']);
});

gulp.task('ts-transpile-merge-compress', () => {
    browserify()
        .add('typings/tsd.d.ts')
         .add('src/index.tsx')
        .plugin(tsify, {target: 'es5', module: 'commonjs'})
         //.add('src/main.js')
         .bundle()
         .on('error', error => console.error(error.toString()))
         .pipe(source('script.js'))
          .pipe(buffer())
          .pipe(uglify())
        //// uglifyjs -m -c --screw-ie8 -o script.js -- script.js
         .pipe(gulp.dest('./'))
         .pipe(notify("Bundling complete!"))
         ;
});