import { Box, Card, Image, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const SearchResultsItems = ({ id, title, overview, year, poster }) => {
  return (
    <Box pl='20px' mt='32px' mr='20px'>
      <Card
        direction='row'
        mb='32px'
        boxShadow='4px 4px 10px #F0F0F0'
        border='1px'
        borderColor='gray.200'
        borderRadius='10px'
        maxH='150px'
        minW='200px'
      >
        <Link to={`/${id}`}>
          <Image
            src={`https://image.tmdb.org/t/p/original${poster}`}
            objectFit='cover'
            maxW={{ base: '100%', sm: '180px' }}
            maxH={{ base: '150px' }}
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
            noOfLines={2}
          >
            {overview}
          </Text>
        </VStack>
      </Card>
    </Box>
  )
}

export default SearchResultsItems
