var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

gulp.task('css', function(){
    gulp.src('./src/css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/'))
})
