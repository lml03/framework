var uglifyConfig = [
    'static/js/jquery-1.7.1.min.js',
    'static/js/jquery.cookie.js',
    'static/js/jquery.form.js'
    ]
let gulp = require('gulp'),
    concat = require('gulp-concat')
    uglify = require('gulp-uglify')
    clean = require('gulp-clean');


gulp.task('clean', function () {
    return gulp.src('static/js/vendor.js')
               .pipe(clean());
});

gulp.task('concat', ['clean'],function(){
    gulp.src(uglifyConfig)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('static/js'))
//        .pipe(uglify())
//        .pipe(gulp.dest('static/js'));
        
})

gulp.task('default',['clean','concat']);

