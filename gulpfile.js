var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('css', function(){
    gulp.src('./src/css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
    }))
    .pipe(gulp.dest('./dist/'))
})
