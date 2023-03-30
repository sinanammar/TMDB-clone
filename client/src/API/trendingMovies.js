const fetchTrendingMovies = async (timeWindow) => {
  try {
    const url = `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=fc1dbada4f9bca02581ed7a246eb6125`
    const response = await fetch(url)

    if (!response.ok) throw new Error('Something went wrong!')

    const movies = await response.json()
    return movies.results
  } catch (e) {}
}
export default fetchTrendingMovies
