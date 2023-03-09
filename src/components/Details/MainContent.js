import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Box, Text, Image, VStack, HStack, Button } from '@chakra-ui/react'

const MainContent = (props) => {
  return (
    <Box className='cardWrapper' pl={{ base: '4px', md: '16px', lg: '32px' }}>
      {props.credits &&
        props.credits.cast.map((credit, index) => {
          return (
            <HStack key={credit.id}>
              <Box
                className='actorCard'
                key={credit.credit_id}
                borderRadius='12px'
                mb='16px'
                h='330px'
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
              {index === props.credits.cast.length - 1 ? (
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
