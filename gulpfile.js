var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var mongoose = require('mongoose');

//Connet to the database
mongoose.connect('mongodb://test:test@ds023603.mlab.com:23603/eyequeue');

//Create schemas

//User
var userSchema = new mongoose.Schema({
  id: String,
  username:
  password:
  paymentMethods: {
    type:
    card_id:
  },
  phoneNumber:
  email:
  phoneNumberVerified: Boolean,
  emailVerified: Boolean,
  picture:
  firstName:
  lastName:
});

//Order
var orderSchema = new mongoose.Schema({
  id: String,
  mealId: String,
  total: Float,
  paymentMethodId: String,
  userId: String
})

//Meal
var mealSchema = new mongoose.Schema({
  id: String,
  picture:
  name: String,
  description: String,
  price: Float,
  prepTime: Int,
  restaurantId: String
})

//restaurantId
var restaurantSchema = new mongoose.Schema({
  id: String,
  name: String,
  phoneNumber: String,
  email: String,
  location: {
    latitude: String,
    longitude: String
  },
  formattedAddress: String,
  description: String,
  priceRange: String,
})

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
