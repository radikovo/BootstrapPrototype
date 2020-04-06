var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var azure = require("gulp-azure-storage");
var fileinclude = require('gulp-file-include');
var log = require("fancy-log");
var sourcemaps = require('gulp-sourcemaps');

const azureCredentials = require('./azure-credentials');

gulp.task('sass', function() {
    return gulp
        .src([
            'src/scss/*.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(sass({outputStyle: 'expanded'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp
        .src([
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', 
            'node_modules/bootstrap/dist/js/bootstrap.min.js', 
            'node_modules/jquery/dist/jquery.min.js', 
            'node_modules/popper.js/dist/popper.min.js',
            'src/js/*.js'
        ])
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
    return gulp
        .src([
            'node_modules/bootstrap/dist/css/bootstrap.css', 
            'node_modules/bootstrap/dist/css/bootstrap.css.map', 
            'node_modules/bootstrap/dist/css/bootstrap.min.css', 
            'node_modules/bootstrap/dist/css/bootstrap.min.css.map'
        ])
        .pipe(gulp.dest("dist/css"));
});

gulp.task('fileinclude', function() {
    return gulp
        .src([
            'src/*.html',
            '!src/include/*.html'
        ])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
    browserSync.init({
        server: ['dist', 'content']
    });

    gulp.watch([
        'src/scss/*.scss'
    ], gulp.series('sass'));

    gulp.watch([
        'src/*.html',
        'src/include/*.html'
    ], gulp.series('fileinclude'));

    gulp.watch([
        'src/js/*.js'
    ], gulp.series('js'));

    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('sass', 'css', 'js', 'fileinclude', 'serve'));

gulp.task('publish', function() {
    return gulp
        .src([
            'dist/**',
            'content/**'
        ])
        .pipe(azure.upload({
    	    "account": azureCredentials.azure.account,
    	    "key": azureCredentials.azure.key,
            "container":  azureCredentials.azure.container,
            "prefix": azureCredentials.azure.prefix, // tohle muze byt prazdne, pak je to root, jinak adresar (a za nim lomitko!!!!), kde to bude.
        }))
        .on("end", function() { log("Publikovano na \x1b[33m%s\x1b[0m", `https://${azureCredentials.azure.account}.z6.web.core.windows.net/${azureCredentials.azure.prefix}`);});
})
