gulp = require 'gulp'
plumber = require 'gulp-plumber'
sourcemaps = require 'gulp-sourcemaps'
coffee = require 'gulp-coffee'
coffeelint = require 'gulp-coffeelint'
notify = require 'gulp-notify'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
browserSync = require 'browser-sync'

gulp.task 'coffee', ->
  gulp.src 'src/*.coffee'
    .pipe plumber(
      errorHandler: notify.onError '<%= error.message %>'
    )
    .pipe coffeelint()
    .pipe sourcemaps.init()
    .pipe coffee()
    .pipe sourcemaps.write()
    .pipe gulp.dest('dest/')

gulp.task 'serve', ->
  browserSync(
    server:
      baseDir: './'
      index: 'demo/index.html'
  )

gulp.task 'default', ['serve'], ->
  gulp.watch ['src/*.coffee'], ['coffee', browserSync.reload]

gulp.task 'build', ->
  gulp.src 'src/*.coffee'
    .pipe coffeelint()
    .pipe coffee()
    .pipe uglify(
      preserveComments: 'some'
    )
    .pipe rename(
      extname: '.min.js'
    )
    .pipe gulp.dest('dest/')
