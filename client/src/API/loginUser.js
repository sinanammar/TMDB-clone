import axios from 'axios'

const loginUser = async (username, password) => {
  try {
    const userData = {
      username,
      password,
    }

    const response = await axios.post(
      'http://localhost:5000/api/login',
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
    throw e.response.data
  }
}

export default loginUser
