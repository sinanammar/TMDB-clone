import {
  Card,
  Image,
  Text,
  VStack,
  Box,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

//Hooks
import { useCookies } from 'react-cookie'

import { Link } from 'react-router-dom'

// Redux
import { addToWatchlist } from '../../features/popular/watchlistSlice'
import { useDispatch } from 'react-redux'

const WatchlistCard = (props) => {
  const { id, title, overview, poster_path, year } = props.movieData
  const [cookies] = useCookies()

  const toast = useToast()
  const dispatch = useDispatch()

  const handleRemove = () => {
    const movie = {
      id,
      title,
      poster_path,
      year,
    }

    const addToWatchlistPayload = {
      movie: { ...movie },
      accessToken: cookies.jwt,
    }
    // addToWatchlist will remove the movie if it already exists in the list
    dispatch(addToWatchlist(addToWatchlistPayload))

    toast({
      position: 'top',
      title: 'Removed from watchlist',
      description: `${title} has been removed from your watchlist`,
      status: 'info',
      duration: 1500,
      isClosable: true,
    })
  }

  return (
    <Box pl='20px' mt='32px'>
      <Card
        direction='row'
        mb='32px'
        boxShadow='4px 4px 10px #F0F0F0'
        border='1px'
        borderColor='gray.200'
        borderRadius='10px'
        maxH='220px'
        h='220'
        minW='200px'
      >
        <Link to={`/${id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/original${poster_path}`}
            objectFit='cover'
            maxW={{ base: '100%', sm: '180px' }}
            maxH={{ base: '100%' }}
            borderLeftRadius='10px'
          />
        </Link>
        <VStack pl='24px' pt='24px' pr='12px' alignItems='flex-start'>
          <Text
            align='start'
            fontWeight='bold'
            fontSize={{ base: 16, md: 18 }}
            letterSpacing='0.07rem'
            wordBreak='break-all'
            textOverflow='unset'
          >
            {title}
          </Text>
          <Text color='gray.400' overflow='hidden'>
            {year}
          </Text>
          <Text
            fontSize='15px'
            overflow='hidden'
            textOverflow='ellipsis'
            noOfLines={3}
          >
            {overview}
          </Text>
          <HStack>
            <IconButton
              onClick={handleRemove}
              variant='outline'
              isRound={true}
              color='#949494'
              borderColor='#949494'
              icon={<CloseIcon />}
            />
            <Text fontSize='14px' color='#A9A9A9'>
              Remove
            </Text>
          </HStack>
        </VStack>
      </Card>
    </Box>
  )
}

export default WatchlistCard
