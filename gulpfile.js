// list dependecies
const { src, dest, watch, series } = require("gulp");
const compileSass = require("gulp-sass")(require("sass"));
compileSass.compiler = require("sass");
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");

// create functions

// scss
function compileCss() {
  return src("src/scss/**/*.scss")
    .pipe(compileSass().on("error", compileSass.logError))
    .pipe(prefix("last 2 versions"))
    .pipe(minify())
    .pipe(dest("./dist/src/css"));
}

// js
function jsmin() {
  return src("src/js/*.js").pipe(terser()).pipe(dest("dist/js"));
}

// images
function optimizeImg() {
  return src("src/images/*.{jpg,png}").pipe(
    imagemin([
      imagemin.mozjpeg({ quality: 80, progressive: true }),
      imagemin.optipng({ optimizationLevel: 2 }),
    ]).pipe(dest("dist/images"))
  );
}

// webp images
function webpImage() {
  return src("dist/images/*.{jpg,png}")
    .pipe(imagewebp())
    .pipe(dest("dist/images"));
}

// watch
function watchTask() {
  watch("src/scss/*.scss", compileCss);
  watch("src/js/*.js", jsmin);
  watch("src/images/*.{jpg,png}", optimizeImg);
  watch("dist/images/*.{jpg,png}", webpImage);
}

// default gulp
exports.default = series(compileCss, jsmin, optimizeImg, webpImage, watchTask);
