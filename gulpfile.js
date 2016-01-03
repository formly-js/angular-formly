const gulp = require('gulp')
const replace = require('gulp-replace')

// bump npm package version into package.js
gulp.task('meteor', function() {
  const pkg = require('./package.json')
  const versionRegex = /(version\:\s*\')([^\']+)\'/gi

  return gulp.src('package.js')
    .pipe(replace(versionRegex, '$1' + pkg.version + "'"))
    .pipe(gulp.dest('./'))
})
