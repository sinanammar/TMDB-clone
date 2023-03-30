const express = require('express')
const passport = require('passport')

// Controllers
const {
  signup,
  login,
  addToWatchlist,
  fetchWatchlist,
  checkEmailAvailability,
  logout,
  clearWatchlist,
} = require('../controllers/userController')

const router = express.Router()

const authenticateUser = passport.authenticate('jwt', {
  session: false,
})

router.post('/signup', signup)
router.post('/login', login)
router.post('/check/email', checkEmailAvailability)
router.post('/watchlist', authenticateUser, addToWatchlist)
router.get('/watchlist', authenticateUser, fetchWatchlist)
router.delete('/clear/watchlist', authenticateUser, clearWatchlist)
router.post('/logout', logout)

module.exports = router
