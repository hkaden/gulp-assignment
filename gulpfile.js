const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const connect = require('gulp-connect');
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');


const paths = {
    html: {
        src: './*.html',
    },
    styles: {
        src: 'src/styles/*.scss',
        watch: './src/styles/*.scss',
        dest: 'build/styles'
    },
    images: {
        src: './src/images/*/*.*',
        dest: 'build/images'
    },
    csssprite: {
        src: 'src/images/icons/*.png',
        dest: 'build'
    },
    script: {
        src: 'src/app/*.js',
        dest: 'build/js'
    },
    venders: {
        script: {
            src: [
                'src/vender/jquery-3.3.1.js',
                'src/vender/jquery.magnific-popup.js',
                'src/vender/jquery.sliderPro.js',
            ],
            dest: 'build/js'
        },
        styles: {
            src: [
                'src/styles/magnific-popup.css',
                'src/styles/slider-pro.css',
            ],
            dest: 'build/styles'
        }
    }
};

const clean = () => del(['assets']);


const buildHtml = async function (cb) {
    console.log('buildHtml');
    gulp.src(paths.html.src)
        .pipe(connect.reload());
    cb();
}


const buildSass = function (cb) {
    console.log('buildSass');
    gulp.src(paths.styles.src)
        .pipe(gulpSass())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(connect.reload());
    cb();
}

const compressImage = async function (cb) {
    console.log('compressImage');
    gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(connect.reload());
    cb();
}

const CSSSprite = async function (cb) {
    console.log('CSSSprite');
    gulp.src('src/images/icons/*.png').pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest('build'));
    cb();
}

const venderJS = async function (cb) {
    console.log('venderJS');
    gulp.src(paths.venders.script.src)
        .pipe(concat('vender.js'))
        .pipe(gulp.dest(paths.venders.script.dest))
        .pipe(rename('vender.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.venders.script.dest))
        .pipe(connect.reload());
    cb();
}

const buildScript = async function (cb) {
    console.log('buildScript');
    gulp.src(paths.script.src)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.script.dest))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.script.dest))
        .pipe(connect.reload());
    cb();
}



const venderCSS = async function (cb) {
    console.log('venderCSS');
    gulp.src(paths.venders.styles.src)
        .pipe(concat('vender.css'))
        .pipe(gulp.dest(paths.venders.styles.dest))
        .pipe(rename('vender.min.css'))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(gulp.dest(paths.venders.styles.dest))
        .pipe(connect.reload());
}


const buildAssets = gulp.series(buildHtml, buildScript, buildSass, gulp.parallel(compressImage, CSSSprite));
const buildVenders = gulp.series(venderJS, gulp.parallel(venderCSS));

const watchfiles = async function () {
    gulp.watch(paths.html.src, buildHtml); 
    gulp.watch(paths.styles.watch, buildSass); 
    gulp.watch(paths.images.src, compressImage);
    gulp.watch(paths.csssprite.src, CSSSprite);
    gulp.watch(paths.script.src, buildScript);
    gulp.watch(paths.venders.script.src, venderJS);
    gulp.watch(paths.venders.styles.src, venderCSS);
}

const webServer = async function () {
    console.log('reload');
    connect.server({
        livereload: true
    });
}

exports.default = gulp.series(buildAssets, buildVenders, webServer, watchfiles);