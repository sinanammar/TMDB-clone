import {
  Box,
  VStack,
  HStack,
  Center,
  IconButton,
  Text,
  Input,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import YearPicker from 'react-year-picker'

const SearchFilters = (props) => {
  const { onFilteringByYear, onCancelingFilters, onFilteringByRate } = props
  return (
    <VStack gap={6}>
      <HStack gap={8} alignItems='baseline'>
        <Text>Filters</Text>
        <Center bg='gray.100' w='32px' h='32px' borderRadius={5}>
          <IconButton icon={<CloseIcon />} onClick={onCancelingFilters} />
        </Center>
      </HStack>
      <Box className='yearPickerContainer'>
        <Box className='yearPicker'>
          <YearPicker onChange={onFilteringByYear} />
        </Box>
      </Box>
      <Box w='30%'>
        <Text pb='8px'>Rate :</Text>
        <Input
          type='number'
          min='1'
          max='10'
          placeholder='Rate..'
          onChange={onFilteringByRate}
        />
      </Box>
    </VStack>
  )
}

export default SearchFilters
