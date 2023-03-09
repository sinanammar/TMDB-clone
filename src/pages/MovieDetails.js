import { Box, Grid, GridItem } from '@chakra-ui/react'

// Hooks
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Components
import Header from '../components/Details/Header'
import Sidebar from '../components/Details/Sidebar'
import MainContent from '../components/Details/MainContent'

// API
import fetchMovieDetails from '../API/movieDetails'
import fetchCredits from '../API/credits'

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({})
  const [credits, setCredits] = useState()
  const { id } = useParams()

  const [movieCreditsInHeader, setMovieCreditsInHeader] = useState()

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchMovieDetails(id)
      setMovieDetails(details)
    }

    fetchDetails()
  }, [id])

  useEffect(() => {
    const fetchMovieCredits = async () => {
      const data = await fetchCredits(id)
      setCredits(data)

      const headerCredits = data.crew.slice(0, 3)
      setMovieCreditsInHeader(headerCredits)
    }

    fetchMovieCredits()
  }, [id, credits])

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
