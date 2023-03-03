import {
  Box,
  HStack,
  Text,
  Image,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react'

// Hooks
import { useState } from 'react'

// Components
import HomeHeader from '../components/Home/Header'
import PopularMoviesList from '../components/Home/PopularMoviesList'
import TrendingList from '../components/Home/TrendingList'
import PageIndicator from '../components/PageIndicator'

const Home = () => {
  const [pageIndex, setPageIndex] = useState(1)

  return (
    <Box height='fit-content'>
      <HomeHeader />
      <TrendingList />
      <PopularMoviesList onPageChange={setPageIndex} pageIndex={pageIndex} />
      <PageIndicator pageNumber={pageIndex} setIndex={setPageIndex} />
    </Box>
  )
}

export default Home
