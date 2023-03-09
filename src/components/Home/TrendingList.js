import { Box, Tabs, TabPanels, TabPanel } from '@chakra-ui/react'

// Hooks
import { useEffect, useState } from 'react'

// Components
import TrendingCard from './TrendingCard'
import ToggleCards from '../UI/ToggleCards'

// API
import fetchTrendingMovies from '../../API/trendingMovies'

const TrendingList = () => {
  const [trendingMovies, setTrendingMovies] = useState()
  const [isToday, setIsToday] = useState(true)

  const timeWindow = isToday ? 'day' : 'week'

  useEffect(() => {
    const fetchTrendingmovies = async () => {
      const movies = await fetchTrendingMovies(timeWindow)
      setTrendingMovies(movies)
    }
    fetchTrendingmovies()
  }, [isToday])

  const toggleRendredMoviesHandler = () => {
    setIsToday((prevState) => !prevState)
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
            <MappingMoviesToCards moviesList={trendingMovies} />
          </TabPanel>
          <TabPanel>
            <MappingMoviesToCards moviesList={trendingMovies} />
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
        moviesList.map((movie) => {
          return (
            <TrendingCard
              key={movie.id}
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
