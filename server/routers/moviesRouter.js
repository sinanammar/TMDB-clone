const express = require('express')
const passport = require('passport')

// Controllers
const {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchMovieDetails,
  fetchSearchQuery,
  fetchKeywords,
} = require('../controllers/moviesController')

const router = express.Router()

const authenticateUser = passport.authenticate('jwt', {
  session: false,
})

router.get('/popular/:page', authenticateUser, fetchPopularMovies)
router.get('/trending/:timeWindow', authenticateUser, fetchTrendingMovies)
router.get('/details/:id', authenticateUser, fetchMovieDetails)
router.get('/search/:title/page/:pageIndex', authenticateUser, fetchSearchQuery)
router.get('/search/keywords/:title', authenticateUser, fetchKeywords)

module.exports = router
