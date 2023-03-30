import {
  Box,
  HStack,
  Text,
  VStack,
  Heading,
  Center,
  Container,
} from '@chakra-ui/react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

// Hooks
import { useToast } from '@chakra-ui/react'
import { useCookies } from 'react-cookie'

// Icons
import { StarIcon } from '@chakra-ui/icons'
import { AiFillHeart } from 'react-icons/ai'
import { BiListUl } from 'react-icons/bi'
import { BsFillBookmarkFill, BsFillPlayFill } from 'react-icons/bs'

// Redux
import { useDispatch } from 'react-redux'
import { addToWatchlist } from '../../features/popular/watchlistSlice'

const Header = (props) => {
  const {
    title,
    release_date,
    overview,
    genres,
    tagline,
    runtime,
    production_countries,
    vote_average,
    id,
    poster_path,
  } = props.movieDetails

  const [cookies] = useCookies()

  const toast = useToast()
  const dispatch = useDispatch()

  let rating = Math.ceil(vote_average * 10)

  // Calculating movie duration
  const hours = Math.floor(runtime / 60)
  const remainingMinutes = runtime % 60
  const duration = `${hours}h ${remainingMinutes}m`

  const darknessStyle = {
    filter: 'brightness(0.9)',
  }

  const handleAddToWatchlist = () => {
    const movie = {
      id,
      title,
      overview,
      poster_path,
      year: release_date,
    }

    const addToWatchlistPayload = {
      movie: { ...movie },
      accessToken: cookies.jwt,
    }
    dispatch(addToWatchlist(addToWatchlistPayload))

    toast({
      position: 'top',
      title: 'Added to watchlist',
      description: `${title} has been added to your watchlist`,
      status: 'success',
      duration: 1500,
      isClosable: true,
    })
  }

  return (
    <Box>
      <Box
        sx={darknessStyle}
        className='coverImage detailsCover'
        w='100hv'
        maxH='580px'
        h={{ base: '720px', md: '620px', xl: '550px' }}
        backgroundImage={`https://image.tmdb.org/t/p/original${props.movieDetails.backdrop_path}`}
        backgroundSize='cover'
      >
        <Box
          display='inline-block'
          color='white'
          position='relative'
          top='50px'
          maxW={{ base: '1000%', md: '80%' }}
          left={{ base: 16, lg: 330 }}
        >
          <HStack gap={10}>
            <Box
              className='posterImage'
              h='450px'
              minW='300px'
              backgroundImage={`https://image.tmdb.org/t/p/original${props.movieDetails.poster_path}`}
              borderRadius='16px'
              objectFit='fill'
              backgroundSize='cover'
            ></Box>
            <VStack alignItems='flex-start' alignContent='center' maxW='30%'>
              <HStack>
                <Heading fontSize='35.2px'>{title}</Heading>
                <Heading fontWeight='light' color='gray.200'>{`(${parseInt(
                  release_date
                )})`}</Heading>
              </HStack>
              <HStack>
                <Text>{release_date}</Text>
                {genres &&
                  genres.map((genre) => (
                    <Text
                      key={genre.id}
                      fontWeight='medium'
                    >{`${genre.name}`}</Text>
                  ))}
                <Text>
                  {production_countries && production_countries.iso_3166_1}
                </Text>
                <Text>{duration}</Text>
              </HStack>
              <HStack gap={4}>
                <HStack>
                  <Center w='70px' bg='#081C22' h='70px' borderRadius='50px'>
                    <Box w='90%' _hover={{ w: '70px', h: '70px' }}>
                      <CircularProgressbar
                        value={rating}
                        text={`${rating}%`}
                        background='true'
                        className='userScore'
                        styles={buildStyles({
                          textSize: '24px',
                          fontWeight: 700,
                          backgroundColor: '#081C22',
                          strokeWidth: '8',
                          textColor: 'white',
                          pathColor: '#21CF79',
                          trailColor: '#1F4529',
                        })}
                      />
                    </Box>
                  </Center>
                  <Text whiteSpace='nowrap' overflow='hidden' fontWeight='bold'>
                    User score
                  </Text>
                </HStack>

                <Center bg='#01253F' boxSize='42px' borderRadius='21px'>
                  <BiListUl size='16px' />
                </Center>
                <Center bg='#01253F' boxSize='42px' borderRadius='21px'>
                  <AiFillHeart size='16px' />
                </Center>
                <Center bg='#01253F' boxSize='42px' borderRadius='21px'>
                  <BsFillBookmarkFill
                    color={'white'}
                    size='16px'
                    onClick={handleAddToWatchlist}
                    cursor='pointer'
                  />
                </Center>
                <Center bg='#01253F' boxSize='42px' borderRadius='21px'>
                  <StarIcon size='16px' />
                </Center>
                <Box
                  display='flex'
                  justify='space-between'
                  alignItems='center'
                  _hover={{ color: 'gray.300' }}
                  cursor='pointer'
                >
                  <BsFillPlayFill size='16px' />
                  <Text
                    whiteSpace='nowrap'
                    overflow='hidden'
                    fontWeight='semibold'
                  >
                    Play Trailer
                  </Text>
                </Box>
              </HStack>
              <Text color='gray.200'>{tagline}</Text>
              <Heading fontSize='20.8px'>Overview</Heading>
              <Container maxW='90%'>
                <Text
                  wordBreak='break-all'
                  color='white'
                  className='overviewText'
                  width='200%'
                  fontWeight='semibold'
                >
                  {overview}
                </Text>
              </Container>
              <HStack
                color='white'
                blockSize='99px'
                display='flex'
                justifyContent='space-between'
                w='100%'
              >
                {props.credits &&
                  props.credits.map((credit) => {
                    return (
                      <VStack key={credit.id} mt='8px'>
                        <Text fontWeight='semibold'>{credit.name}</Text>
                        <Text alignSelf='flex-start'>
                          {credit.known_for_department}
                        </Text>
                      </VStack>
                    )
                  })}
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
