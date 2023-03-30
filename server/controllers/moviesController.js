const axios = require('axios')

const baseURL = 'https://api.themoviedb.org/3/movie'

module.exports.fetchPopularMovies = async (req, res) => {
  const pageIndex = req.params.page
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=fc1dbada4f9bca02581ed7a246eb6125&language=en-US&page=${pageIndex}`

    const response = await axios.get(url)
    res.send(response.data.results)
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}

module.exports.fetchTrendingMovies = async (req, res) => {
  const timeWindow = req.params.timeWindow
  try {
    const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=fc1dbada4f9bca02581ed7a246eb6125`

    const response = await axios.get(url)
    res.send(response.data)
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}

module.exports.fetchMovieDetails = async (req, res) => {
  const id = req.params.id
  try {
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=fc1dbada4f9bca02581ed7a246eb6125&language=en-US`
    const castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=fc1dbada4f9bca02581ed7a246eb6125&language=en-US`

    const [movieResponse, castResponse] = await Promise.all([
      axios.get(movieUrl),
      axios.get(castUrl),
    ])

    const movieDetails = movieResponse.data
    const castDetails = castResponse.data

    res.send({ movieDetails, castDetails })
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}

module.exports.fetchSearchQuery = async (req, res) => {
  const pageIndex = req.params.pageIndex
  const title = req.params.title

  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=fc1dbada4f9bca02581ed7a246eb6125&language=en-US&query=${title}&page=${pageIndex}&include_adult=false`
    const response = await axios.get(url)
    res.send(response.data)
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}

module.exports.fetchKeywords = async (req, res) => {
  const title = req.params.title
  try {
    const url = `https://api.themoviedb.org/3/search/keyword?api_key=fc1dbada4f9bca02581ed7a246eb6125&query=${title}&page=1`
    const response = await axios.get(url)

    res.send(response.data)
  } catch (e) {
    res.status(e.statusCode || 400).send(e.message)
  }
}
