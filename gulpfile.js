var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('css', function(){
    gulp.src('./src/css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('image', () =>
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
);

gulp.task('babel', () =>
    gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
         .pipe(gulp.dest('./dist/js'))
 );

 gulp.task('watch', function() {
    gulp.watch('./src/css/*.css', ['css'])
})

gulp.task('default', ['css', 'image', 'babel'], function(){
    gulp.watch('./src/css/*.css', ['css'])
    gulp.watch('./src/images/*', ['image'])
    gulp.watch('./src/js/*.js', ['babel'])
})