import { Box, Grid, GridItem, Center, Text } from '@chakra-ui/react'

// Hooks
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'

// Components
import Header from '../components/Details/Header'
import Sidebar from '../components/Details/Sidebar'
import MainContent from '../components/Details/MainContent'

// API
import fetchMovieDetails from '../API/movieDetails'

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({})
  const [credits, setCredits] = useState()
  const [error, setError] = useState()
  const [cookies, setCookie] = useCookies()

  const { id } = useParams()

  const [movieCreditsInHeader, setMovieCreditsInHeader] = useState()

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const { movieDetails, castDetails } = await fetchMovieDetails(
          id,
          cookies.jwt
        )
        setMovieDetails(movieDetails)
        setCredits(castDetails)

        const headerCredits = castDetails.crew.slice(0, 3)
        setMovieCreditsInHeader(headerCredits)
      } catch (e) {
        setError(e.message)
      }
    }
    getMovieDetails()
  }, [id])

  if (error) {
    return (
      <Box h='100vh'>
        <Center>
          <Text fontSize='36px'>{error}</Text>
        </Center>
      </Box>
    )
  }

  return (
    <Box>
      <Header movieDetails={movieDetails} credits={movieCreditsInHeader} />
      <Box>
        <Grid templateColumns='repeat(8, 1fr)'>
          <GridItem colSpan={1} minH='100vh' bg='white'></GridItem>
          <GridItem colSpan={5} minH='100vh' bg='white'>
            <MainContent credits={credits} />
          </GridItem>

          <GridItem as='aside' colSpan={2} minH='100vh' bg='white'>
            <Sidebar movieData={movieDetails} />
          </GridItem>
        </Grid>
      </Box>
    </Box>
  )
}

export default MovieDetails
