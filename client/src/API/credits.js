import axios from 'axios'
// Not used
const fetchCredits = async (id) => {
  try {
    const repsosne = await axios.get(
      `http://localhost:5000/api/movies/detail/${id}`
    )
    // return credits
    return repsosne.data
  } catch (e) {
    throw new Error('could not')
  }
}

export default fetchCredits
