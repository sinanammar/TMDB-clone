import { Box, Image, Spacer, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const TrendingCard = (props) => {
  let rating = Math.ceil(props.rate * 10)

  return (
    <VStack>
      <Box h='220px' bg='gray.200' mr='20px' borderRadius={10}>
        <Link to={`${props.id}`}>
          <Image
            objectFit='cover'
            backgroundSize='contain'
            src={`https://image.tmdb.org/t/p/original${props.poster}`}
            borderRadius={10}
            minH='220'
            minW='150'
          />
        </Link>
      </Box>
      <Box
        className='ratingContainer'
        w='100%'
        position='relative'
        bottom={7}
        left={2}
        display='flex'
        // justifyContent='flex-start's
      >
        <Box w='50px' h='0px' maxH='0px'>
          <CircularProgressbar
            value={rating}
            text={`${rating}%`}
            background='true'
            styles={buildStyles({
              textSize: '22px',
              backgroundColor: 'black',
              strokeWidth: '8',
              textColor: 'white',
              pathColor: '#B6B82B',
              trailColor: '#423D0F',
            })}
          />
        </Box>
      </Box>
      <Box
        display='flex'
        w='100%'
        flexDirection='column'
        flexWrap='wrap'
        justifyContent='flex-start'
        pt='24px'
      >
        <Text fontWeight='bold'>{props.title}</Text>
        <Text color='#a3a2a2'>{props.year}</Text>
      </Box>
    </VStack>
  )
}

export default TrendingCard