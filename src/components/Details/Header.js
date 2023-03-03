import { Box, HStack, Text, VStack, Heading, Center } from '@chakra-ui/react'

// Icons
import { StarIcon } from '@chakra-ui/icons'
import { AiFillHeart } from 'react-icons/ai'
import { BiListUl } from 'react-icons/bi'
import { BsFillBookmarkFill, BsFillPlayFill } from 'react-icons/bs'

const Header = (props) => {
  const {
    title,
    release_date,
    overview,
    genres,
    tagline,
    runtime,
    production_countries,
  } = props.movieDetails

  // Calculating movie duration
  const hours = Math.floor(runtime / 60)
  const remainingMinutes = runtime % 60
  const duration = `${hours}h ${remainingMinutes}m`

  const darknessStyle = {
    filter: 'brightness(0.9)',
  }

  return (
    <Box>
      <Box>
        <Box
          sx={darknessStyle}
          className='coverImage'
          w='100%'
          maxH='550px'
          h='550px'
          backgroundImage={`https://image.tmdb.org/t/p/original${props.movieDetails.backdrop_path}`}
          backgroundSize='cover'
        >
          <Box
            display='inline-block'
            color='white'
            position='relative'
            top='50px'
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
              <VStack
                alignItems='flex-start'
                alignContent='center'
                h='360px'
                w='500px'
              >
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
                      <Text key={genre.id}>{`${genre.name}`}</Text>
                    ))}
                  <Text>
                    {production_countries && production_countries.iso_3166_1}
                  </Text>
                  <Text>{duration}</Text>
                </HStack>
                <HStack gap={3}>
                  <Text whiteSpace='nowrap' overflow='hidden'>
                    User score
                  </Text>

                  <Center bg='#01253F' boxSize='42px' borderRadius='21px'>
                    <BiListUl size='16px' />
                  </Center>
                  <Center bg='#01253F' boxSize='42px' borderRadius='21px'>
                    <AiFillHeart size='16px' />
                  </Center>
                  <Center bg='#01253F' boxSize='42px' borderRadius='21px'>
                    <BsFillBookmarkFill size='16px' />
                  </Center>
                  <Center bg='#01253F' boxSize='42px' borderRadius='21px'>
                    <StarIcon size='16px' />
                  </Center>
                  <Box
                    display='flex'
                    justify='space-between'
                    alignItems='center'
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
                <Text
                  color='white'
                  className='overviewText'
                  // blockSize='100%'
                  width='200%'
                  fontWeight='semibold'
                >
                  {overview}
                </Text>
                <HStack
                  color='white'
                  blockSize='99px'
                  display='flex'
                  justifyContent='space-between'
                  w='100%'
                >
                  <VStack>
                    <Text fontWeight='semibold'>Name</Text>
                    <Text>Role</Text>
                  </VStack>
                  <VStack>
                    <Text fontWeight='semibold'>Name</Text>
                    <Text>Role</Text>
                  </VStack>
                  <VStack>
                    <Text fontWeight='semibold'>Name</Text>
                    <Text>Role</Text>
                  </VStack>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
