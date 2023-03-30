import { Box } from '@chakra-ui/react'

// Hooks
import { useState } from 'react'

// Components
import HomeHeader from '../components/Home/Header'
import PopularMoviesList from '../components/Home/PopularMoviesList'
import TrendingList from '../components/Home/TrendingList'
import PageIndicator from '../components/PageIndicator'

import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  return (
    <Box height='fit-content'>
      <HomeHeader />
      <TrendingList />
      <PopularMoviesList />
      <PageIndicator />
    </Box>
  )
}

export default Home
