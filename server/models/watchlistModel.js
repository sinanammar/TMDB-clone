const mongoose = require('mongoose')

const watchlistSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  year: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // ref: 'User',
  },
})

const Watchlist = mongoose.model('Watchlist', watchlistSchema)

module.exports = Watchlist
