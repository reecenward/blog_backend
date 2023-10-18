const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const app = express();
const passportJWT = require('passport-jwt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(passport.initialize());
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      async (username, password, done) => {
        try {
          const user = await prisma.user.findUnique({
            where: { username },
          });
  
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: 'Invalid credentials' });
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };
  
  const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      // Assuming you have a database where user data is stored, you can retrieve the user based on the payload information.
      const user = await prisma.user.findUnique({
        where: { id: payload.id }, // Adjust this query based on your database schema
      });
  
      if (!user) {
        return done(null, false); // User not found
      }
  
      // If the user is found, you can pass it to the next middleware or route handler.
      return done(null, user);
    } catch (error) {
      return done(error, false); // Error occurred while querying the database
    }
  });
  
passport.use('jwt', jwtStrategy);

module.exports = passport;