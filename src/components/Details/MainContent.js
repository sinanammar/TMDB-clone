import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Button,
  Card,
} from '@chakra-ui/react'

// Hooks
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// API
import fetchCredits from '../../API/credits'

const MainContent = () => {
  const [credits, setCredits] = useState()
  const { id } = useParams()

  useEffect(() => {
    const fetchMovieCredits = async () => {
      const data = await fetchCredits(id)
      setCredits(data)
    }

    fetchMovieCredits()
  }, [id])

  return (
    <Box className='cardWrapper' pl={{ base: '4px', md: '16px', lg: '32px' }}>
      {credits &&
        credits.cast.map((credit, index) => {
          const showHalfList = credits.cast.length / 2 > index
          return (
            <HStack key={credit.id}>
              <Box
                className='actorCard'
                key={credit.credit_id}
                borderRadius='12px'
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${credit.profile_path}`}
                  alt={credit.name}
                  objectFit='cover'
                  w='100%'
                  h='230px'
                  borderRadius='8px 8px 0 0'
                />
                <VStack h='50%' alignItems='flex-start' pl='4px'>
                  <Text fontWeight='bold'>{credit.name}</Text>
                  <Text>{credit.character}</Text>
                </VStack>
              </Box>
              {index === credits.cast.length - 1 ? (
                <HStack>
                  <Button className='castButton' variant='unstyled'>
                    View More
                  </Button>
                  <ArrowForwardIcon />
                </HStack>
              ) : (
                <></>
              )}
            </HStack>
          )
        })}
    </Box>
  )
}

export default MainContent
