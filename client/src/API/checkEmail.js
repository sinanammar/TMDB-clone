import axios from 'axios'

const checkEmail = async (email) => {
  try {
    const response = await axios.post('http://localhost:5000/api/check/email', {
      email,
    })
    return response.data
  } catch (e) {
    throw e
  }
}

export default checkEmail
