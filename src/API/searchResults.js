const fetchSearchResults = async (title, pageIndex) => {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=fc1dbada4f9bca02581ed7a246eb6125&language=en-US&query=${title}&page=${pageIndex}&include_adult=false`
    const response = await fetch(url)

    if (!response.ok) throw new Error('Something went wrong!')

    const queryResults = await response.json()

    return queryResults.results
  } catch (e) {}
}

export default fetchSearchResults
