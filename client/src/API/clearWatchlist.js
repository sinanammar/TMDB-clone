import axios from 'axios'
const clearWatchlist = async (accessToken) => {
  try {
    const response = await axios.delete(
      'http://localhost:5000/api/clear/watchlist',
      {
        headers: {
          Authorization: accessToken,
        },
      }
    )
  } catch (e) {
    throw e.message
  }
}

export default clearWatchlist
