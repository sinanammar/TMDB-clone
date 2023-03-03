import { useEffect, useState } from 'react'

import {
  Flex,
  Box,
  HStack,
  Avatar,
  Image,
  Input,
  InputLeftElement,
  Icon,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { AddIcon, SearchIcon, BellIcon } from '@chakra-ui/icons'

import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'

const NavigationBar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const { title } = useParams()
  console.log(title)
  const [searchTerm, setSearchTerm] = useState(title)
  const navigate = useNavigate()

  useEffect(() => {}, [])

  const leftButtonsStyles = {
    color: 'white',
    fontWeight: 'bold',
  }

  const searchHandler = (e) => setShowSearchBar((prevState) => !prevState)

  const inputHandler = (e) => setSearchTerm(e.target.value)

  const handleSearchFromNavBar = (e) => {
    if (searchTerm.length === 0 || e.keyCode !== 13) return

    navigate(`search/${searchTerm}`)
  }

  return (
    <Box>
      <Box bg='main.900'>
        <Flex
          as='nav'
          p='20px'
          w={{ base: '95%', lg: '85%' }}
          height='64px'
          align='center'
          justify='space-between'
        >
          <Box w='160px' ml={{ base: 8, md: 90, lg: 300 }}>
            <Link to='/'>
              <Image
                className='landingImage'
                src='/main-logo.svg'
                alt='TMDB logo'
                objectFit='cover'
                w='250px'
                backgroundSize='cover'
              />
            </Link>
          </Box>

          <HStack spacing='32px'>
            <AddIcon color='white' cursor='pointer' boxSize='1.5em' ml='10px' />
            <BellIcon color='white' cursor='pointer' boxSize='1.5em' />
            <Avatar boxSize='1.7em'></Avatar>
            <SearchIcon
              boxSize='1.5em'
              color='#05B3E3'
              onClick={searchHandler}
              cursor='pointer'
            />
          </HStack>
        </Flex>
      </Box>
      {showSearchBar || title ? (
        <InputGroup>
          <InputLeftElement
            onClick={handleSearchFromNavBar}
            pl='320px'
            children={<SearchIcon color='gray.300' />}
            cursor='pointer'
          />
          <Input
            pl='340px'
            value={searchTerm}
            onChange={inputHandler}
            onKeyDown={handleSearchFromNavBar}
          />
        </InputGroup>
      ) : null}
    </Box>
  )
}

export default NavigationBar
