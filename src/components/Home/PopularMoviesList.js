import { SimpleGrid, Tabs, TabPanels, TabPanel } from '@chakra-ui/react'

// Hooks
import { useEffect, useState } from 'react'

// components
import PopularmovieCard from './PopularMovieCard'
import ToggleCards from '../UI/ToggleCards'

// API
import fetchPopularMovies from '../../API/popularMovies'

const PopularMoviesList = ({ pageIndex }) => {
  const [popularMovies, setPopularMovies] = useState()
  const [showAll, setShowAll] = useState(true)

  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await fetchPopularMovies(pageIndex)
      setPopularMovies(movies)

      pageIndex === 1 ? window.scrollTo(0, 0) : window.scrollTo(0, 850)
    }

    fetchMovies()
  }, [pageIndex])

  const toggleRendredMoviesHandler = () => {
    setShowAll((prevState) => !prevState)
  }

  return (
    <>
      <Tabs>
        <ToggleCards
          onSectionChange={showAll}
          onToggleRendredMovies={toggleRendredMoviesHandler}
          buttonTextOne='All'
          buttonTextTwo='Watchlist'
          label='Popular'
        />
        <TabPanels>
          <TabPanel>
            <MappingMoviesToCards
              movies={popularMovies}
              setWatchlist={setWatchlist}
              watchlist={watchlist}
            />
          </TabPanel>

          <TabPanel>
            <MappingMoviesToCards
              movies={watchlist}
              setWatchlist={setWatchlist}
              watchlist={watchlist}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default PopularMoviesList

const MappingMoviesToCards = ({ movies, setWatchlist, watchlist }) => {
  return (
    <SimpleGrid
      columns={4}
      spacing={12}
      minChildWidth='200px'
      pl={{ base: '90px', lg: '200px', xl: '285px' }}
      pr={{ base: '90px', lg: '200px', xl: '285px' }}
    >
      {movies &&
        movies.map((movie) => {
          return (
            <PopularmovieCard
              key={movie.overview ? movie.id : movie.title}
              id={movie.id}
              title={movie.title}
              imageSrc={movie.poster_path}
              year={movie.release_date}
              setWatchlist={setWatchlist}
              watchlist={watchlist}
            />
          )
        })}
    </SimpleGrid>
  )
}
