var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var orderedStreams = require('ordered-read-streams');



var SOURCEPATH = {
  sassSource : 'src/scss/*.scss',
  htmlSource : 'src/*.html',
  jsSource : 'src/js/**',
  imgSource: 'src/img/**'
}

var APPPATH = {
  root : 'app/',
  css : 'app/css',
  js : 'app/js',
  webfonts: 'app/webfonts',
  mediaelement: 'app/mediaelement',
  img : 'app/img'

}

gulp.task('clean-html', function(){
  return gulp.src(APPPATH.root + '/*.html', {read: false, force: true})
    .pipe(clean());
});

gulp.task('clean-scripts', function(){
  return gulp.src(APPPATH.js + '/*.js', {read: false, force: true})
    .pipe(clean());
});

gulp.task('clean-images', function(){
  return gulp.src(APPPATH.img + '/*.{jpg,png,svg}', {read: false, force: true})
    .pipe(clean());
});


// Move JS Files to src/js
gulp.task('scripts', ['clean-scripts'], function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
     'node_modules/jquery/dist/jquery.min.js',
     'node_modules/popper.js/dist/umd/popper.min.js',
     'node_modules/bootstrap-select-v4/dist/js/bootstrap-select.min.js',
     SOURCEPATH.jsSource + 'main.js'])
        .pipe(gulp.dest(APPPATH.js))
        .pipe(browserSync.stream());
});



/*
gulp.task('scripts',  ['js', 'clean-scripts'], function(){
  gulp.src(SOURCEPATH.jsSource)
    .pipe(concat('main.js'))
    .pipe(browserify())
    .pipe(gulp.dest(APPPATH.js))
    .pipe(browserSync.stream());
});

*/


gulp.task('copy', ['clean-html'], function(){
  gulp.src(SOURCEPATH.htmlSource)
    .pipe(gulp.dest(APPPATH.root));
});




gulp.task('sass', function(){
  var mediaelementCSS = gulp.src('./node_modules/mediaelement/build/mediaelementplayer.css');
  var fontawesomeCSS = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/all.css');
  var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
  var sassFiles;

  sassFiles = gulp.src(SOURCEPATH.sassSource)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    //.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    return orderedStreams([mediaelementCSS, fontawesomeCSS, bootstrapCSS, sassFiles])
      .pipe(concat('app.css'))
      .pipe(gulp.dest(APPPATH.css));
});


// Move Fonts to src/fonts
gulp.task('move-fonts', function() {
  return gulp.src(['./node_modules/@fortawesome/fontawesome-free/webfonts/*.{eot,svg,ttf,woff,woff2}'])
    .pipe(gulp.dest(APPPATH.webfonts))
})

// Move Images to app/img
gulp.task('images', ['clean-images'], function() {
  return gulp.src([SOURCEPATH.imgSource + '/*.{jpg,png,svg}'])
    .pipe(gulp.dest(APPPATH.img))
})

// Move mediaelement to src/mediaelement
gulp.task('mediaelement', function() {
  return gulp.src('node_modules/mediaelement/build/**')
    .pipe(gulp.dest(APPPATH.mediaelement))
})

gulp.task('serve', ['sass'], function(){
  browserSync.init([APPPATH.css + '/*.css', APPPATH.root + '/*.html', APPPATH.js + '/*.js'], {
    server: {
      baseDir : APPPATH.root
    }
  })
});

gulp.task('watch', ['serve', 'copy', 'scripts', 'move-fonts', 'mediaelement', 'images'], function(){
  gulp.watch([SOURCEPATH.sassSource], ['sass']);
  gulp.watch([SOURCEPATH.htmlSource], ['copy']);
  gulp.watch([SOURCEPATH.jsSource], ['scripts']);
  gulp.watch([SOURCEPATH.imgSource], ['images']);
});

gulp.task('default', ['watch'] );
