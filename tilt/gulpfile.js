/*
    Before using make sure you have:
    npm install --save-dev gulp gulp-minify-css gulp-concat gulp-uglify gulp-autoprefixer gulp-sass
    npm install --save-dev gulp-terser
    Make sure to change the directory names in the default watch function to the CSS/SCSS/SASS directories you are using so it reloads
 */
var gulp = require('gulp'),
//minifyCSS = require('gulp-minify-css'),
concat = require('gulp-concat')
//uglify = require('gulp-uglify')
//prefix = require('gulp-autoprefixer')
//sass = require('gulp-sass');
terser = require('gulp-terser');

// Minifies JS
gulp.task('build', function(){
    // TODO: Buld the TypeScript
    // TODO: Clean output
    return gulp.src('out/**/*.js')
    .pipe(concat('tilt.js'))
    .pipe(terser())
    .pipe(gulp.dest('release/'))
});
