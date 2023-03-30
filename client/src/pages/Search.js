import { Box, Grid, GridItem } from '@chakra-ui/react'

// Hooks
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'

// conmponents
import SearchResultsItems from '../components/search/SearchResultsItems'
import SearchMenu from '../components/search/SearchMenu'
import PageIndicator from '../components/PageIndicator'
import SearchFilters from '../components/search/SearchFilters'

// API
import fetchSearchResults from '../API/searchResults'

const Search = () => {
  const [searchResult, setSearchResult] = useState()
  const [pageIndex, setPageIndex] = useState(1)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [cookies] = useCookies()

  const { title } = useParams()

  // Fetching search results
  useEffect(() => {
    const fetchSearchQuery = async () => {
      const results = await fetchSearchResults(title, pageIndex, cookies.jwt)
      setSearchResult(results)
    }

    fetchSearchQuery()
  }, [title, pageIndex, cookies.jwt])

  const filterByYear = (year) => {
    const filteredMovies = searchResult.filter((movie) => {
      const releaseYear = parseInt(movie.release_date)
      return releaseYear === year
    })
    setFilteredMovies(filteredMovies)
    return filteredMovies
  }

  const cancelFilters = () => setFilteredMovies([])

  let renderedMovies = []
  if (!filteredMovies.length) {
    renderedMovies = searchResult
  } else {
    renderedMovies = filteredMovies
  }

  const filterByRating = (data) => {
    const userRating = parseInt(data.target.value * 10)
    const minRating = Math.floor(userRating / 10) * 10
    const maxRating = minRating + 9

    const filteredMovies = searchResult.filter((movie) => {
      const rate = Math.ceil(movie.vote_average * 10)
      return rate >= minRating && rate <= maxRating
    })

    setFilteredMovies(filteredMovies)
  }

  return (
    <Box color='black'>
      <Grid templateColumns='repeat(6, 1fr)'>
        <GridItem colSpan={1}></GridItem>
        <GridItem
          as='aside'
          colSpan={1}
          minHeight={{ lg: '100vh' }}
          minW='320px'
          p='20px'
        >
          <SearchMenu title={title} />
          <SearchFilters
            onFilteringByRate={filterByRating}
            onCancelingFilters={cancelFilters}
            onFilteringByYear={filterByYear}
          />
        </GridItem>

        <GridItem colSpan={3} mr='8px'>
          {renderedMovies &&
            renderedMovies.map((result) => {
              return (
                <SearchResultsItems
                  key={result.id}
                  title={result.title}
                  overview={result.overview}
                  year={result.release_date}
                  poster={result.poster_path}
                  id={result.id}
                />
              )
            })}
        </GridItem>

        <GridItem colSpan={{ base: 0, sm: 0, lg: 0, xl: 1 }}></GridItem>
      </Grid>
      <PageIndicator pageNumber={pageIndex} setIndex={setPageIndex} />
    </Box>
  )
}

export default Search
