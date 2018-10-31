"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var del = require("del");
var rename = require("gulp-rename");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var svgstore = require("gulp-svgstore");
var cheerio = require("gulp-cheerio");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("copy", function () {
  return gulp.src([
  "source/fonts/*.{woff,woff2}",
  "source/js/**",
  "source/*.html"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build")
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("build/img/*.jpg")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("build/img/sprite-*.svg")
  .pipe(cheerio({
    run: function ($) {
      $('[fill]').removeAttr('fill');
    },
    parserOptions: { xmlMode: true }
}))
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img/"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/"
  });
  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "images",
  "sprite",
  "webp",
  "css"
));

gulp.task("start", gulp.series("build", "server"));
