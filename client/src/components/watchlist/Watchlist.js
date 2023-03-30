import {
  Box,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'

// Hooks
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

// Redux
import { fetchWatchlist } from '../../features/popular/watchlistSlice'

// Componenets
import WatchlistCard from './WatchlistCard'

import { clearWatchlist } from '../../features/popular/watchlistSlice'
import { Link } from 'react-router-dom'

const Watchlist = () => {
  const dispatch = useDispatch()
  const [cookies] = useCookies()
  const watchlist = useSelector((state) => state.watchlist.watchlist)

  useEffect(() => {
    dispatch(fetchWatchlist(cookies.jwt))
  }, [dispatch, cookies.jwt])

  const handleClearWatchlist = async () => {
    try {
      dispatch(clearWatchlist(cookies.jwt))
    } catch (e) {
      console.log(e)
    }
  }

  let content
  if (watchlist && watchlist.length > 0) {
    content = watchlist.map((movie) => (
      <WatchlistCard key={movie._id} movieData={movie} />
    ))
  } else {
    content = (
      <Box h='55vh' pt='16px' display='flex' justifyContent='center'>
        <VStack>
          <Text
            color='main.900'
            fontSize='24px'
            fontWeight='semibold'
            textAlign='center'
          >
            You Don't have any movies in your watchlist.
          </Text>
          <Link to='/'>
            <Button display='flex' textAlign='center'>
              Explore movies
            </Button>
          </Link>
        </VStack>
      </Box>
    )
  }

  return (
    <Box h='100%'>
      <Box w='100%' h='220px' bg='#1B303D' mb='32px'>
        <Text></Text>
      </Box>

      <Grid templateColumns='repeat(6, 1fr)'>
        <GridItem colSpan={1}></GridItem>
        <GridItem colSpan={4} className='aaa'>
          <Box ml='20px'>
            <HStack>
              <Box>
                <Text fontSize='24px' fontWeight='bold'>
                  My watchlist
                </Text>
              </Box>
              <Menu>
                <MenuButton
                  isRound={true}
                  as={IconButton}
                  icon={<HiDotsVertical />}
                />
                <MenuList>
                  <MenuItem onClick={handleClearWatchlist}>Clear list</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Box>
          {content}
        </GridItem>
        <GridItem colSpan={1}></GridItem>
      </Grid>
    </Box>
  )
}

export default Watchlist
