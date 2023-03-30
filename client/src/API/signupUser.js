import axios from 'axios'
import { redirect } from 'react-router-dom'
const signupUser = async (userData) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/signup',
      userData,
      {
        credentials: 'include',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.status === 200) {
      window.location.href = '/'
    }
  } catch (e) {
    throw e
  }
}

export default signupUser
