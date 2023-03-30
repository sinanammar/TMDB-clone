import axios from 'axios'

const fetchSearchResults = async (title, pageIndex, accessToken) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/movies/search/${title}/page/${pageIndex}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    )

    return response.data.results
  } catch (e) {
    throw e.message
  }
}

export default fetchSearchResults
