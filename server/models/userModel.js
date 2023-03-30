const mongoose = require('mongoose')
const Watchlist = require('../models/watchlistModel')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    email: {
      type: String,
      required: true,

      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Virtual entity - this way I can get all the movies in watchlist for a specific user
// by getting the user by ID and populate the virtual field on user
userSchema.virtual('watchlist', {
  ref: 'Watchlist',
  localField: '_id',
  foreignField: 'owner',
})

userSchema.methods.generateAccessToken = async function () {
  const user = this

  const token = jwt.sign({ _id: user._id }, 'mysecret', { expiresIn: '1d' })
  user.tokens = user.tokens.concat({ token: 'Bearer ' + token })
  await user.save()

  return token
}

userSchema.statics.authenticateUsers = async function (username, password) {
  const user = await User.findOne({ username })
  if (!user) {
    throw new Error('Unable to log in, wrong credintials!')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login, wrong credintials!')
  }

  return user
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
