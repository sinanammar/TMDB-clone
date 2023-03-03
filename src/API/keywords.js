const fetchKeywords = async (title) => {
  try {
    const url = `https://api.themoviedb.org/3/search/keyword?api_key=fc1dbada4f9bca02581ed7a246eb6125&query=${title}&page=1`
    const response = await fetch(url)

    if (!response.ok) throw new Error('Something went wrong!')

    return response.json()
  } catch (e) {}
}

export default fetchKeywords
