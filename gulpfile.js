const gulp = require('gulp');
const minifyCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

// Tâche pour minifier les fichiers CSS
gulp.task('minify-css', () => {
  return gulp.src('src/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

// Tâche pour minifier les fichiers JS
gulp.task('minify-js', () => {
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Tâche pour minifier les fichiers HTML
gulp.task('minify-html', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
});

// Tâche par défaut pour exécuter toutes les tâches de minification
gulp.task('minify', gulp.parallel('minify-css', 'minify-js', 'minify-html'));

// Tâche de surveillance des changements pour déclencher automatiquement la minification
gulp.task('watch', () => {
  gulp.watch('src/css/*.css', gulp.series('minify-css'));
  gulp.watch('src/js/*.js', gulp.series('minify-js'));
  gulp.watch('src/*.html', gulp.series('minify-html'));
});

// Tâche par défaut exécutée en tapant "gulp" dans le terminal
gulp.task('default', gulp.series('minify', 'watch'));
