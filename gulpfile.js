var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Connect to the database
mongoose.connect('mongodb://test:test@ds023603.mlab.com:23603/eyequeue');

//Create schemas & models

//User Schema
var UserSchema = Schema({
  id:Schema.Types.ObjectId,
  username: {
    type: Schema.Types.ObjectId,
    ref: 'Username'
  },
  password: {
    type: Schema.Types.ObjectId,
    ref: 'Password'
  },
  paymentMethods: {
    type: Schema.Types.ObjectId,
    ref: 'PaymentMethods'
  },
  phoneNumber: {
    type: Schema.Types.ObjectId,
    ref: 'PhoneNumber'
  },
  email: {
    type: Schema.Types.ObjectId,
    ref: 'Email'
  },
  phoneNumberVerified: {
    type: Schema.Types.ObjectId,
    ref: 'PhoneNumber'
  },
  emailVerified: {
    type: Schema.Types.ObjectId,
    ref: 'EmailVerified'
  },
  picture: {
    type: Schema.Types.ObjectId,
    ref: 'Picture'
  },
  firstName: {
    type: Schema.Types.ObjectId,
    ref: 'FirstName'
  },
  lastName: {
    type: Schema.Types.ObjectId,
    ref: 'LastName'
  }
});

//User Model
var User = new mongoose.model('User', userSchema);

//Order Schema
var orderSchema = Schema({
	id: Schema.Types.ObjectId,
 	meal: {
 		type: Schema.Types.ObjectId,
 		ref: 'Meal'
 	},
 	total: Schema.Types.Number,
 	paymentMethod: {
 		type: Schema.Types.ObjectId,
 		ref: 'PaymentMethod'
 	},
 	user: {
 		type: Schema.Types.ObjectId,
 		ref: 'User'
 	}
})

//Order Model
var Order = mongoose.model('Order', orderSchema);

//Meal Schema
var mealSchema = Schema({
  id: Schema.Types.ObjectId,
  picture: {
    type: Schema.Types.ObjectId,
    ref: 'Picture'
  },
  name: {
    type: Schema.Types.ObjectId,
    ref: 'Name'
  },
  description: {
    type: Schema.Types.ObjectId,
    ref: 'Description'
  },
  price: {
    type: Schema.Types.ObjectId,
    ref: 'Price'
  },
  prepTime: {
    type: Schema.Types.ObjectId,
    ref: 'PrepTime'
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'RestaurantId'
  },
})
//Meal Model
var Meal = mongoose.model('Meal', mealSchema);

//Restaurant Schema
var restaurantSchema = Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: Schema.Types.ObjectId,
    ref: 'Name'
  },
  phoneNumber: {
    type: Schema.Types.ObjectId,
    ref: 'PhoneNumber'
  },
  email: {
    type: Schmea.Types.ObjectId,
    ref: 'Email'
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
  formattedAddress: {
    type: Schema.Types.ObjectId,
    ref: 'FormattedAddress'
  },
  description: {
    type: Schema.Types.ObjectId,
    ref: 'Description'
  },
  priceRange: {
    type: Schema.Types.ObjectId,
    ref: 'PriceRange'
  },
})

//restaurant model
var Restaurant = mongoose.model('Restaurant', restaurantSchema);
  id: String,
  name: String,
  phoneNumber: String,
  email: String,
  location: {
    latitude: Point,
    longitude: Point
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
