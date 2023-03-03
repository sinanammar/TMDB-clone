const fetchMovieDetails = async (id) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=fc1dbada4f9bca02581ed7a246eb6125&language=en-US`
    const response = await fetch(url)

    if (!response.ok) throw new Error('Something went wrong!')

    const movieData = await response.json()
    return movieData
  } catch (e) {}
}

export default fetchMovieDetails
