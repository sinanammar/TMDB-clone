import {
  Flex,
  Box,
  HStack,
  Avatar,
  Image,
  Input,
  InputLeftElement,
  InputGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Button,
} from '@chakra-ui/react'
import { AddIcon, SearchIcon, BellIcon } from '@chakra-ui/icons'

// Hooks
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'

const NavigationBar = ({ setIsLoggedIn, isLoggedIn }) => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const { title } = useParams()

  const [searchTerm, setSearchTerm] = useState(title)
  const navigate = useNavigate()

  const searchHandler = (e) => setShowSearchBar((prevState) => !prevState)

  const inputHandler = (e) => setSearchTerm(e.target.value)

  const handleSearchFromNavBar = (e) => {
    if (searchTerm.length === 0 || e.keyCode !== 13) return
    navigate(`search/${searchTerm}`)
  }

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/logout',
        { a: '' },
        {
          credentials: 'include',
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (response.status === 200) {
        setIsLoggedIn(false)
        navigate('/login')
      }
    } catch (e) {
      throw e
    }
  }

  const content = isLoggedIn ? (
    <HStack spacing='32px'>
      <AddIcon color='white' cursor='pointer' boxSize='1.5em' ml='10px' />
      <BellIcon color='white' cursor='pointer' boxSize='1.5em' />
      <Menu>
        <MenuButton>
          <Avatar boxSize='1.7em'></Avatar>
        </MenuButton>
        <MenuList>
          <Link to={'watchlist'}>
            <MenuItem>Watchlist</MenuItem>
          </Link>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
        </MenuList>
      </Menu>
      <SearchIcon
        boxSize='1.5em'
        color='#05B3E3'
        onClick={searchHandler}
        cursor='pointer'
      />
    </HStack>
  ) : (
    <HStack gap={4}>
      <Button
        h='32px'
        w='32px'
        variant='outline'
        color='white'
        _hover={{ backgroundColor: 'white', color: 'main.900' }}
      >
        En
      </Button>
      <Link to='login'>
        <Text color='white' fontWeight='semibold'>
          Login
        </Text>
      </Link>
      <Link to='signup'>
        <Text color='white' fontWeight='semibold'>
          Join TMDB
        </Text>
      </Link>
    </HStack>
  )

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
          {content}
          {/* <Text color='white'>Join TMDB</Text> */}
          {/* <HStack spacing='32px'>
            <AddIcon color='white' cursor='pointer' boxSize='1.5em' ml='10px' />
            <BellIcon color='white' cursor='pointer' boxSize='1.5em' />
            <Menu>
              <MenuButton>
                <Avatar boxSize='1.7em'></Avatar>
              </MenuButton>
              <MenuList>
                <Link to={'watchlist'}>
                  <MenuItem>Watchlist</MenuItem>
                </Link>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </MenuList>
            </Menu>
            <SearchIcon
              boxSize='1.5em'
              color='#05B3E3'
              onClick={searchHandler}
              cursor='pointer'
            />
          </HStack> */}
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
