const User = require('../models/userModel')
const Watchlist = require('../models/watchlistModel')

module.exports.signup = async (userData) => {
  const user = new User(userData)
  try {
    await user.save()
    await user.generateAccessToken()
    return user
  } catch (e) {
    throw e
  }
}

module.exports.login = async (userCrednitials) => {
  const { username, password } = userCrednitials
  try {
    const user = await User.authenticateUsers(username, password)
    await user.generateAccessToken()
    return user
  } catch (e) {
    throw e
  }
}

module.exports.checkEmailAvailability = async (email) => {
  try {
    const userEmail = email.email
    const isEmailExist = await User.find({ email: userEmail })

    if (!isEmailExist.length) {
      return 'valid'
    }

    return 'Email is already in use'
  } catch (e) {
    throw e
  }
}

module.exports.addToWatchList = async (movieData, userId) => {
  try {
    const { id } = movieData
    const isExist = await Watchlist.find({ id })
    if (!isExist.length) {
      const watchlistItem = new Watchlist({
        ...movieData,
        owner: userId,
      })
      await watchlistItem.save()
      return watchlistItem
    }

    const response = await Watchlist.findOneAndDelete({ id })
    return { deleted: 'true', movieId: response.id }
  } catch (e) {
    throw e
  }
}

module.exports.fetchWatchlist = async (userId) => {
  try {
    const watchlist = await Watchlist.find({ owner: userId })
    return watchlist
  } catch (e) {
    throw e
  }
}

module.exports.clearWatchlist = async (userId) => {
  try {
    await Watchlist.deleteMany({ owner: userId })
    return 'Deleted!'
  } catch (e) {
    throw e
  }
}
