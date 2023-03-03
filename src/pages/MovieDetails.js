import { Box, Grid, GridItem, Image } from '@chakra-ui/react'

// Hooks
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Components
import Header from '../components/Details/Header'
import Sidebar from '../components/Details/Sidebar'
import MainContent from '../components/Details/MainContent'

// API
import fetchMovieDetails from '../API/movieDetails'

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await fetchMovieDetails(id)
      setMovieDetails(details)
    }

    fetchDetails()
  }, [id])

  return (
    <Box>
      <Header movieDetails={movieDetails} />
      <Box>
        <Grid templateColumns='repeat(8, 1fr)'>
          <GridItem colSpan={1} minH='100vh' bg='white'></GridItem>
          <GridItem colSpan={5} minH='100vh' bg='white'>
            <MainContent />
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
