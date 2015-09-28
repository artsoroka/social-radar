var gulp = require('gulp'); 
var browserify = require('browserify'); 
var reactify = require('reactify'); 
var source = require('vinyl-source-stream'); 

gulp.task('browserify', function(){
    browserify('./src/main.js')
        .transform('reactify')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist/')); 
}); 

gulp.task('copy', function(){
    gulp.src('./dist/bundle.js')
        .pipe(gulp.dest('./public')); 
}); 

gulp.task('build', ['browserify', 'copy'], function(){
    console.log('done build'); 
}); 