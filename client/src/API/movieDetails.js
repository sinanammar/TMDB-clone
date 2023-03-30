import axios from 'axios'

const fetchMovieDetails = async (id, accessToken) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/movies/details/${id}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    )
    const data = {
      movieDetails: response.data.movieDetails,
      castDetails: response.data.castDetails,
    }
    return data
  } catch (e) {
    throw e
    // throw new Error('Error fetching movie details!')
  }
}

export default fetchMovieDetails
