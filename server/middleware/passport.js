const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'mysecret'

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById({ _id: jwt_payload._id })
      if (!user) return done(null, false)
      if (user) {
        return done(null, user, { message: 'Authorized', user })
      }
    } catch (e) {
      return done(e, false)
    }
  })
)
