const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user')

passport.use(new GoogleStrategy(
    // configuration object
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK
    },
    // verify callback function with async/await
    async function(accesToken, refreshToken, profile, cb) {
        try {
            let user = await User.findOne({ googleId: profile.id });
            if (user) return cb(null, user);

            user = await User.create({
                name: profile.displayName,
                googleId: profile.id,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value
            });
            return cb(null, user);
        } catch(err) {
            return cb(err);
        }
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });

  passport.deserializeUser(async function(userId, cb) {
    cb(null, await User.findById(userId));
    // The above async/await code replaces this code
    // User.findById(userId).then(function(user) {
    //   cb(null, user);
    // });
  });
  