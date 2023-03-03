import {
  Heading,
  Box,
  Text,
  TableContainer,
  Tr,
  Table,
  Tbody,
  Td,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const SearchMenu = (props) => {
  const navigate = useNavigate()
  return (
    <>
      <TableContainer
        color='black'
        border='1px'
        borderColor='gray.200'
        bg='white'
        mt='16px'
        mb='24px'
        borderRadius='10px'
      >
        <Box bg='#05B3E3' borderTopRadius='10px' h='50px'>
          <Heading fontSize='16px' p='12px' color='white'>
            Search Results
          </Heading>
        </Box>
        <Table>
          <Tbody>
            {searchMenuItems.map((item) => {
              return (
                <Tr
                  className='searchMenuTd'
                  key={item.item}
                  borderBottom='1px solid gray'
                  borderRadius='10px'
                >
                  <Td
                    onClick={() => navigate(`/search/${props.title}/keywords`)}
                  >
                    {item.item}
                  </Td>
                  <Td w='20px' alignItems='center' fontWeight='light'>
                    {item.count}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SearchMenu

const searchMenuItems = [
  {
    item: 'TV Shows',
    count: 10000,
  },
  {
    item: 'Movies',
    count: 10000,
  },
  {
    item: 'People',
    count: 9424,
  },
  {
    item: 'Keywords',
    count: 8421,
  },
  {
    item: 'Networks',
    count: 10000,
  },
  {
    item: 'Collections',
    count: 10000,
  },
]
