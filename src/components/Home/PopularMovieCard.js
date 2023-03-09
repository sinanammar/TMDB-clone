import {
  Card,
  CardHeader,
  Text,
  Image,
  VStack,
  Box,
  IconButton,
} from '@chakra-ui/react'
import { AddIcon, CheckIcon } from '@chakra-ui/icons'

// Hooks
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PopularmovieCard = (props) => {
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    storeInStorage()

    const isExistInWatchlist = props.watchlist.filter(
      (movie) => movie.id === props.id
    )

    isExistInWatchlist.length ? setIsAdded(true) : setIsAdded(false)
  }, [props.watchlist])

  const addtoWatchlist = () => {
    const newMovie = {
      id: props.id,
      title: props.title,
      poster_path: props.imageSrc,
      year: props.year,
    }

    // GET
    const storedMovies = JSON.parse(localStorage.getItem('watchlist'))

    const isNotExist = storedMovies.filter((movie) => movie.id === newMovie.id)

    if (isNotExist.length === 0) {
      props.setWatchlist([...storedMovies, newMovie])
      setIsAdded(true)
    } else if (isNotExist.length > 0) {
      const updatedMovies = props.watchlist.filter(
        (movie) => movie.id !== newMovie.id
      )

      props.setWatchlist([...updatedMovies])
      setIsAdded(false)
    }
  }

  const storeInStorage = () => {
    localStorage.setItem('watchlist', JSON.stringify(props.watchlist))
  }

  return (
    <VStack gap={2}>
      <Link to={`${props.id}`}>
        <Card
          className='popularMovie'
          maxH='290px'
          h='290px'
          minW='150px'
          w='200px'
          boxShadow='2px 0px 10px #dbdbdb'
        >
          <CardHeader>
            <Image
              src={`https://image.tmdb.org/t/p/original${props.imageSrc}`}
              alt={props.title}
            />
          </CardHeader>
        </Card>
      </Link>
      <Box
        display='flex'
        justifyContent='space-around'
        flexWrap='wrap'
        w='200px'
      >
        <VStack justify='flex-start' w='120px' alignItems='start'>
          <Link to={`${props.id}`}>
            <Text
              className='movieTitle'
              fontSize='14px'
              fontWeight='bold'
              overflow='wrap'
            >
              {props.title}
            </Text>
          </Link>
          <Text color='#bcbccb'>{props.year}</Text>
        </VStack>
        <IconButton
          icon={isAdded ? <CheckIcon /> : <AddIcon />}
          variant='ghost'
          colorScheme='telegram'
          isRound={true}
          onClick={addtoWatchlist}
        />
      </Box>
    </VStack>
  )
}

export default PopularmovieCard
