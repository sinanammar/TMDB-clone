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

// Components
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import NavigationBar from '../components/UI/NavigationBar'

const RootLayout = () => {
  return (
    <>
      <NavigationBar />
      <Outlet height='fit-content' />
      <Footer />
    </>
  )
}

export default RootLayout

// Nav Bar buttons
{
  /* <Button sx={leftButtonsStyles} size='sm' variant='unstyled' ml='24px'>
            Movies
          </Button>
          <Button sx={leftButtonsStyles} size='sm' variant='unstyled'>
            TV Shows
          </Button>
          <Button sx={leftButtonsStyles} size='sm' variant='unstyled'>
            People
          </Button>
          <Button sx={leftButtonsStyles} size='sm' variant='unstyled'>
            More
          </Button> */
}
