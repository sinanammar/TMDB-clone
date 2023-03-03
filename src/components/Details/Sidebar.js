import { Box, Button, Divider, HStack, Text } from '@chakra-ui/react'
import { ChevronRightIcon, LinkIcon } from '@chakra-ui/icons'

const Sidebar = (movieData) => {
  const data = movieData.movieData
  const spokenLanguage = 0
  //   const spokenLanguage = data.spoken_languages[0].english_name

  return (
    <Box>
      <Box w='80%'>
        <Box
          display='flex'
          flexDirection='column'
          h='450px'
          justifyContent='space-evenly'
          pl='14px'
        >
          <HStack>
            <ChevronRightIcon w='54px' h='54px' />
            <Divider
              w='5%'
              margin=''
              variants='gray.900'
              orientation='vertical'
            />
            <LinkIcon w='32px' h='32px' />
          </HStack>
          <Box>
            <Text fontWeight='semibold'>Status</Text>
            <Text>{data.status}</Text>
          </Box>
          <Box>
            <Text fontWeight='semibold'>Original Language</Text>
            <Text>{spokenLanguage && spokenLanguage}</Text>
          </Box>
          <Box>
            <Text fontWeight='semibold'>Budget</Text>
            <Text>{data.budget ? data.budget : '-'}</Text>
          </Box>
          <Box>
            <Text fontWeight='semibold'>Revenue</Text>
            <Text>{data.revenue ? data.revenue : '-'}</Text>
          </Box>
          <Box>
            <Text fontWeight='semibold'>Key Words</Text>
            <Text>-</Text>
          </Box>
        </Box>
        <Divider w='80%' margin='auto' color='gray' />

        <Text fontWeight='semibold' pt='24px'>
          Content Score
        </Text>
        <Box pt='12px'>
          <Box
            w='80%'
            color='white'
            bg='black'
            borderRadius='8px'
            h='38px'
            display='flex'
            alignItems='center'
          >
            <Text fontWeight='bold' m='12px'>
              100
            </Text>
          </Box>
          <Text>Yes! Looking good!</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
