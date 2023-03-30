const fetchPopularMovies = async (pageIndex) => {
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=fc1dbada4f9bca02581ed7a246eb6125&language=en-US&page=${pageIndex}`
    const response = await fetch(url)

    if (!response.ok) throw new Error('Something went wrong!')

    const movies = await response.json()
    return movies.results
  } catch (e) {}
}

export default fetchPopularMovies
