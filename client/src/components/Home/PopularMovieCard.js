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
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'

// Redux
import { useDispatch } from 'react-redux'
import { addToWatchlist } from '../../features/popular/watchlistSlice'

const PopularmovieCard = (props) => {
  const [isAdded, setIsAdded] = useState(false)
  const dispatch = useDispatch()
  const [cookies] = useCookies()

  const handleAddToWatchlist = () => {
    const movie = {
      id: props.id,
      title: props.title,
      poster_path: props.imageSrc,
      year: props.year,
      overview: props.overview,
    }

    const addToWatchlistPayload = {
      movie: { ...movie },
      accessToken: cookies.jwt,
    }
    dispatch(addToWatchlist(addToWatchlistPayload))
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
          onClick={handleAddToWatchlist}
        />
      </Box>
    </VStack>
  )
}

export default PopularmovieCard
