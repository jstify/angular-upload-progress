var gulp = require("gulp");
var LiveServer = require("gulp-live-server");
var browserSync = require("browser-sync");
var browserify = require("browserify");
var source = require("vinyl-source-stream");

gulp.task("live-server", function() {
	browserSync.init({
        server: {
            baseDir: "."
        },
        port: 8082
    });
});

gulp.task("bundle", function() {
    return browserify({
        entries: "./app/app.js",
        debug: true
    })
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./dist"))
})

gulp.task("serve", ["bundle","live-server"], function() {
	console.log("Server is running...");
	gulp.task("watch", ["bundle"], browserSync.reload);
    gulp.watch("./app/**/*.js", ["watch"]);
});