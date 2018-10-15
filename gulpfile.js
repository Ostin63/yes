const gulp = require('gulp');
const connect = require('gulp-connect');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const less = require('gulp-less');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
 
gulp.task('less', function () {
  gulp.src('./assets/less/*.less')
    .pipe(less())
    .pipe(rename("main.css"))
    .pipe(gulp.dest('./assets/css/'))
    .pipe(autoprefixer({
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./assets/*.html')
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload());
});

gulp.task('js', function () {
  gulp.src('./assets/js/*.js')
    .pipe(minify())
    .pipe(gulp.dest('./public/js/'))
    .pipe(connect.reload());
});

gulp.task('fonts', function () {
  gulp.src('./assets/fonts/*')
    .pipe(gulp.dest('./public/fonts/'))
    .pipe(connect.reload());
});

gulp.task('img', function () {
  gulp.src('./assets/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/img/'))
    .pipe(connect.reload());
});


gulp.task('connect', function () {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('clean', function () {
  return gulp.src(['public/*'], { read: false })
    .pipe(clean());
});

// Watch
gulp.task('watch', function () {
  gulp.watch("./assets/*.html", ["html"]);
  gulp.watch("./assets/css/*.css", ["css"]);
  gulp.watch("./assets/js/*.js", ["js"]);
  gulp.watch("./assets/less/*.less", ["less"]);
});

gulp.task('build', (callback) => runSequence('clean', ['html', 'css', 'less', 'js', 'img', 'fonts'], callback));
gulp.task('default', (callback) => runSequence('build', 'connect', 'watch', callback));