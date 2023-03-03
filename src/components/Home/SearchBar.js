import { Button, Input, InputGroup } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  const searchQuerySubmitHandler = (e) => {
    e.preventDefault()
    if (searchQuery === '') {
      return
    }
    navigate(`search/${searchQuery}`)
  }

  const searchQueryHandler = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <form onSubmit={searchQuerySubmitHandler}>
      <InputGroup
        position='relative'
        top={{ base: 75, md: '40px' }}
        w={{ base: '40vh', md: '70vh', md: '80vh', lg: '130vh' }}
      >
        <Input
          placeholder='  Search for a movie...'
          onChange={searchQueryHandler}
          value={searchQuery}
          name='title'
          variant='unstyled'
          bg='white'
          p='8px'
          borderStartRadius='40px'
          position='relative'
          width='90%'
          top='200px'
        />
        <Button
          position='absolute'
          right={-1}
          className='searchButton'
          type='submit'
          bgGradient='linear(to-r, #1ACFB4, #0ABBD8)'
          color='white'
          fontWeight='extrabold'
          variant='unstyled'
          w={{ base: '20%', md: '15%' }}
          borderRadius='25px'
          top='200px'
        >
          Search
        </Button>
      </InputGroup>
    </form>
  )
}

export default SearchBar
