const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");//lemme check my Mongo Database

passport.serializeUser( (user,done) => {
//ok so we got user now, generate cookie
  done(null, user.id);//stuff into cookie
});

passport.deserializeUser((id, done) => {
  User.findById(id)
      .then(user => {
        done(null, user);
      });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //we already have a record with given profile ID
          done(null, existingUser);
        } else {
          // make a new record
        new User({ googleId: profile.id })
          .save()
          .then(user => done(null,user)); //save () takes this record and saves it into the DB for us
        }
      });
    }
  )
); //Create new instance of google strategy
