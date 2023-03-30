import { Grid, GridItem, Text } from '@chakra-ui/react'

// Hooks
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCookies } from 'react-cookie'

// API
import fetchKeywords from '../API/keywords'

// Components
import SearchMenu from '../components/search/SearchMenu'

const KeywordsSearch = () => {
  const [keywords, setKeywords] = useState([])
  const [cookies] = useCookies()

  const { title } = useParams()

  useEffect(() => {
    const keywords = async () => {
      const keywords = await fetchKeywords(title, cookies.jwt)
      setKeywords(keywords)
    }

    keywords()
  }, [])

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
        {keywords.results &&
          keywords.results.map((keyword) => {
            return <Text key={keyword.id}>{keyword.name}</Text>
          })}
      </GridItem>
    </Grid>
  )
}

export default KeywordsSearch
