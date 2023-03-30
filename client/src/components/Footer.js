import { Box, Heading, List, ListItem, Image } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box as='footer' bg='main.900' h='200px' w='100%'>
      <Box
        as='nav'
        display='flex'
        justifyContent='center'
        alignItems='center'
        w='100%'
        h='100%'
      >
        <Box alignItems='center'>
          <Image src='/logo.svg' h='140px' w='160px' />
        </Box>
      </Box>
    </Box>
  )
}

export default Footer

const FooterListItems = () => {
  let heading = 'THE BASICS'

  return (
    <Box color='white' pt='80px' pb='80px' boxSizing='border-box' pl='60px'>
      <Heading mb='8px' fontSize='24px'>
        {heading}
      </Heading>
      <List>
        <ListItem>About TMDB</ListItem>
        <ListItem>Contact Us</ListItem>
        <ListItem>Support Forums</ListItem>
        <ListItem>API</ListItem>
      </List>
    </Box>
  )
}
