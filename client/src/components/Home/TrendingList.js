import { Box, Tabs, TabPanels, TabPanel } from '@chakra-ui/react'

// Hooks
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

// Components
import TrendingCard from './TrendingCard'
import ToggleCards from '../UI/ToggleCards'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchTrending,
  onTimeWindowChange,
} from '../../features/trending/trendingSlice'

const TrendingList = () => {
  const [isToday, setIsToday] = useState(true)
  const [cookies] = useCookies()

  const trending = useSelector((state) => state.trending.trending.results)
  const trendingStatus = useSelector((state) => state.trending.status)
  const dispatch = useDispatch()

  const timeWindow = isToday ? 'day' : 'week'

  const test = {
    timeWindow,
    accessToken: cookies.jwt,
  }

  useEffect(() => {
    if (trendingStatus === 'idle') {
      dispatch(fetchTrending(test))
    }
  }, [trendingStatus, dispatch, cookies])

  const toggleRendredMoviesHandler = () => {
    setIsToday((prevState) => !prevState)
    dispatch(onTimeWindowChange())
  }

  return (
    <Box mt='40px'>
      <Tabs variant='unstyled'>
        <ToggleCards
          onSectionChange={isToday}
          onToggleRendredMovies={toggleRendredMoviesHandler}
          buttonTextOne='Today'
          buttonTextTwo='Week'
          label='Trending'
        />

        <TabPanels>
          <TabPanel>
            <MappingMoviesToCards moviesList={trending} />
          </TabPanel>
          <TabPanel>
            <MappingMoviesToCards moviesList={trending} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default TrendingList

const MappingMoviesToCards = ({ moviesList }) => {
  return (
    <Box className='wrapper'>
      {moviesList &&
        moviesList.map((movie, index) => {
          return (
            <TrendingCard
              key={index || movie.id}
              poster={movie.poster_path}
              title={movie.title}
              year={movie.release_date}
              id={movie.id}
              rate={movie.vote_average}
            />
          )
        })}
    </Box>
  )
}
