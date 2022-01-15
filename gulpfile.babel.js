import gulp from 'gulp';
import gulpPug from 'gulp-pug';
import del from 'del';
import gulpWebserver from 'gulp-webserver';
import gulpImage from 'gulp-image';

const gulpSass = require('gulp-sass')(require('node-sass'));

const routes = {
  pug: {
    watch: 'src/**/*.pug',
    src: 'src/*.pug',
    dest: 'build',
  },
  img: {
    src: 'src/images/*',
    dest: 'build/images',
  },
  scss: {
    watch: 'src/scss/**/*.scss',
    src: 'src/scss/style.scss',
    dest: 'build/css',
  },
};

const pug = () =>
  gulp.src(routes.pug.src).pipe(gulpPug()).pipe(gulp.dest(routes.pug.dest));

const clean = () => del(['build']);

const webserver = () =>
  gulp.src('build').pipe(gulpWebserver({ livereload: true, open: true }));

const img = () =>
  gulp.src(routes.img.src).pipe(gulpImage()).pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(gulpSass().on('error', gulpSass.logError))
    .pipe(gulp.dest(routes.scss.dest));

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.watch, styles);
};

const prepare = gulp.series([clean, img]);
const assets = gulp.series([pug, styles]);
const postDev = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, postDev]);

// pug -> html
// scss -> css
// optimize
