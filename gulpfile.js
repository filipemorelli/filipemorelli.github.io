var gulp = require('gulp');
var purify = require('gulp-purifycss');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

gulp.task('css', function () {
    return gulp.src('./assets/css/*.css')
        .pipe(purify(['./assets/**/*.js', './**/*.html']))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('fonts', function () {
    return gulp.src('./assets/fonts/*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('styles', ['fonts', 'css'], function () {
    return gulp.src('dist/css/*.css')
        .pipe(concat('site.css'))
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('jquery', function () {
    return gulp.src('./assets/js/jquery.js')
        .pipe(gulp.dest('public/js'));
})

gulp.task('js-minify', function () {
    return gulp.src(['./assets/js/*.js', '!./assets/js/jquery.js'])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('js', ['jquery', 'js-minify'], function () {

});

gulp.task('img', function () {
    gulp.src('./assets/img/**/*.+(png|jpg|gif)')
        .pipe(changed('public/assets/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('public/assets/img'));
});