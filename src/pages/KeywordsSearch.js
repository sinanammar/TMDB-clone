import { Box } from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import {
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Center,
  IconButton,
  CloseIcon,
  Input,
} from '@chakra-ui/react'

// API
import fetchKeywords from '../API/keywords'

// Components
import SearchMenu from '../components/search/SearchMenu'
import { useParams } from 'react-router-dom'

const KeywordsSearch = () => {
  const { title } = useParams()
  //   console.log(title)

  //   useEffect(() => {}, [])

  return (
    <Grid templateColumns='repeat(6, 1fr)'>
      <GridItem colSpan={1}></GridItem>

      <GridItem
        as='aside'
        colSpan={1}
        minHeight={{ lg: '100vh' }}
        minW='320px'
        p='20px'
      >
        <SearchMenu />
      </GridItem>
      <GridItem colSpan={3} mr='8px' mt='30px' ml='24px'>
        <Text>aaa</Text>
      </GridItem>
    </Grid>
  )
}

export default KeywordsSearch
