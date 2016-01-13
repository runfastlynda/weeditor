var gulp = require('gulp'); 
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

gulp.task('lint', function() {
    gulp.src('./app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
    gulp.src('./app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./app/css'));
});

gulp.task('browser-sync', ['sass'], function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('watch',function(){
    gulp.watch('./app/scss/*.scss', ['sass']);
    gulp.watch('./app/js/*.js', ['lint', 'sass']);
    gulp.watch(['./app/*.html', './app/css/*.css', './app/js/*.js', './app/images/*'], browserSync.reload);
})

gulp.task('default', ['lint', 'sass', 'browser-sync','watch']);


