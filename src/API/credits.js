const fetchCredits = async (id) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=fc1dbada4f9bca02581ed7a246eb6125&language=en-US`
    const response = await fetch(url)
    const credits = await response.json()

    return credits
  } catch (e) {}
}

export default fetchCredits
