import { SimpleGrid, Text, Box } from '@chakra-ui/react'

// Hooks
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

// components
import PopularmovieCard from './PopularMovieCard'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchPopular } from '../../features/popular/popularSlice'
import { fetchWatchlist } from '../../features/popular/watchlistSlice'

const PopularMoviesList = () => {
  const [cookies] = useCookies()

  // Redux
  const popular = useSelector((state) => state.popular.popular)
  const popularStatus = useSelector((state) => state.popular.status)

  const watchlist = useSelector((state) => state.watchlist.watchlist)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWatchlist(cookies.jwt))
    if (popularStatus === 'idle') {
      dispatch(fetchPopular(cookies.jwt))
    }
  }, [popularStatus, dispatch, cookies.jwt])

  return (
    <Box>
      <Text
        pl={{ base: 79, md: 135, lg: 170, xl: 220, '2xl': 300 }}
        mb='24px'
        fontSize='24px'
        fontWeight='semibold'
        pr='16px'
      >
        Popular
      </Text>
      <SimpleGrid
        columns={4}
        spacing={12}
        minChildWidth='200px'
        pl={{ base: '90px', lg: '200px', xl: '285px' }}
        pr={{ base: '90px', lg: '200px', xl: '285px' }}
      >
        {popular &&
          popular.map((movie, index) => {
            return (
              <PopularmovieCard
                key={index || movie.id}
                id={movie.id}
                title={movie.title}
                imageSrc={movie.poster_path}
                year={movie.release_date}
                overview={movie.overview}
              />
            )
          })}
      </SimpleGrid>
    </Box>
  )
}

export default PopularMoviesList
