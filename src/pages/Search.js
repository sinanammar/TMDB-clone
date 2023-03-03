import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Center,
  IconButton,
  Text,
  Input,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import YearPicker from 'react-year-picker'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

// Hooks
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// conmponents
import SearchResultsItems from '../components/search/SearchResultsItems'
import SearchMenu from '../components/search/SearchMenu'
import PageIndicator from '../components/PageIndicator'

// API
import fetchSearchResults from '../API/searchResults'
import KeywordsSearch from './KeywordsSearch'

const Search = () => {
  const [searchResult, setSearchResult] = useState()
  const [pageIndex, setPageIndex] = useState(1)
  const [filteredMovies, setFilteredMovies] = useState([])

  const [section, setSection] = useState(true)

  const { title } = useParams()

  // Fetching search results
  useEffect(() => {
    const fetchSearchQuery = async () => {
      const results = await fetchSearchResults(title, pageIndex)
      setSearchResult(results)
    }

    fetchSearchQuery()
  }, [title, pageIndex, searchResult])

  const yearsFilter = (year) => {
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

  const handleChange = (data) => {
    const userRating = parseInt(data.target.value * 10)
    const minRating = Math.floor(userRating / 10) * 10
    const maxRating = minRating + 9

    const filteredMovies = searchResult.filter((movie) => {
      const rate = Math.ceil(movie.vote_average * 10)
      return rate >= minRating && rate <= maxRating
    })

    setFilteredMovies(filteredMovies)
    // userRating === 0
    //   ? setFilteredMovies(filteredMovies)
    //   : setSearchResult(searchResult)
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
          <VStack gap={6}>
            <HStack gap={8} alignItems='baseline'>
              <Text>Filters</Text>
              <Center bg='gray.100' w='32px' h='32px' borderRadius={5}>
                <IconButton icon={<CloseIcon />} onClick={cancelFilters} />
              </Center>
            </HStack>
            <Box className='yearPickerContainer'>
              <Box className='yearPicker'>
                <YearPicker onChange={yearsFilter} />
              </Box>
            </Box>
            <Box w='30%'>
              <Text pb='8px'>Rate :</Text>
              <Input
                type='number'
                min='1'
                max='10'
                placeholder='Rate..'
                onChange={handleChange}
              />
            </Box>
          </VStack>
        </GridItem>
        <GridItem colSpan={3} mr='8px'>
          {section ? (
            <>
              {/* // <GridItem colSpan={3} mr='8px'> */}
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
            </>
          ) : (
            // </GridItem>
            // <GridItem colSpan={3} mr='8px'>
            <KeywordsSearch />
            // </GridItem>
          )}
        </GridItem>

        <GridItem colSpan={{ base: 0, sm: 0, lg: 0, xl: 1 }}></GridItem>
      </Grid>
      <PageIndicator pageNumber={pageIndex} setIndex={setPageIndex} />
    </Box>
  )
}

export default Search
