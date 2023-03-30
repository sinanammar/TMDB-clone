import axios from 'axios'

const fetchKeywords = async (title, accessToken) => {
  try {
    const resposne = await axios.get(
      `http://localhost:5000/api/movies/search/keywords/${title}`,
      {
        headers: {
          Authorization: accessToken,
        },
      }
    )
    return resposne.data
  } catch (e) {
    // console.error(e.stack)
    throw new Error(`Error fetching key words for ${title}`)
  }
}

export default fetchKeywords
