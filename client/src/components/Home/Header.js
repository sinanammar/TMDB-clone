import { Box, Text } from '@chakra-ui/react'
import SearchBar from './SearchBar'

const HomeHeader = () => {
  return (
    <Box
      className='searchForm'
      align='center'
      mb='60px'
      maxH='360px'
      minH='360px'
      maxW='1350px'
      backgroundImage='cover.jpeg'
      objectFit='cover'
      backgroundSize='cover'
    >
      <SearchBar />
      <Box
        color='white'
        display='flex'
        flexDirection='column'
        alignItems='flex-start'
        pl='56px'
        maxH='70px'
      >
        <Text fontSize='48px' fontWeight='bold' fontFamily='body'>
          Welcome
        </Text>
        <Text fontSize='36px'>
          Millions of movies, TV shows and people to discover. Explore now.
        </Text>
      </Box>
    </Box>
  )
}

export default HomeHeader
