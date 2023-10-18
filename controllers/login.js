const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.Login = async (req, res, next) => {
    console.log('Received login request');
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        console.error('Authentication error:', err);
        return next(err);
      }
      if (!user) {
        console.log('Authentication failed');
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      console.log('Authentication succeeded');
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  
      res.cookie('jwt-token', token, {
        httpOnly: false,
        maxAge: 3600 * 1000,
        secure: false,
        path: '/',
      });
  
      return res.json({ token });
    })(req, res, next);
  };