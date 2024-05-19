# evallo-assessment

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cors = require('cors');
const googleAuth = require('../models/google-auth.dal');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Add this middleware to parse JSON bodies

let userProfile;

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_KEY,
    callbackURL: process.env.REDIRECT_URI,
  },
  function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
  }
));

app.use(passport.initialize());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/google/error' }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/auth/google/success?token=${req.user.token}`);
  }
);

app.get('/auth/google/success', async (req, res) => {
  const { failure, success } = await googleAuth.registerWithGoogle(userProfile);
  if (failure) {
    return res.status(400).json({ message: 'Google user already exists in DB' });
  }
  res.status(200).json({ message: 'Registering new Google user', user: userProfile });
});

app.get('/auth/google/error', (req, res) => res.status(400).json({ message: 'Error logging in via Google' }));

app.get('/auth/google/signout', (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log('session destroyed.');
    });
    res.status(200).json({ message: 'User signed out' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to sign out user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
