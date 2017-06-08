'use strict';

var pug = require('gulp-pug');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');
var bower = require('main-bower-files');
var bowerNormalizer = require('gulp-bower-normalize');
var paths = {
  scss:['./scss/main.scss'],
  pug:['./views/*.pug']
};

gulp.task('views', function buildHTML(done) {
  return gulp.src('./views/*.pug')
  .on('data', function(file){
      //console.log({ relative: file.relative, contents: file.contents });
  })
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./dist'));
  done();
});

 
gulp.task('scss', function (done) {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
	.pipe(sass({
      outputStyle: 'expanded'
	}).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
    done();
    });

gulp.task('dist', gulp.parallel('views','scss',function(done){
    done();
}));

gulp.task('dist:watch',function(){
    gulp.watch(paths.pug,gulp.series('views'));
    gulp.watch(paths.scss,gulp.series('scss'));
});

gulp.task('default', function() {
    return gulp.src(bower(), {base: './bower_components'})
        .pipe(bowerNormalizer({bowerJson: './bower.json'}))
        .pipe(gulp.dest('./vendor/'))
});
    