import { Box, Text, TabList, Tab } from '@chakra-ui/react'

const ToggleCards = (props) => {
  const {
    onSectionChange,
    onToggleRendredMovies,
    buttonTextOne,
    buttonTextTwo,
    label,
  } = props

  const TabOneColor = onSectionChange
    ? 'linear(to-r, #1ACFB4, #0ABBD8)'
    : 'white'

  const TabTwoColor = onSectionChange
    ? 'white'
    : 'linear(to-r, #1ACFB4, #0ABBD8)'

  return (
    <Box
      display='flex'
      justifyContent='flex-start'
      alignItems='baseline'
      w='60%'
      pb='6px'
      pl={{ base: 79, md: 135, lg: 170, xl: 220, '2xl': 300 }}
    >
      <Text fontSize='24px' fontWeight='semibold' pr='16px'>
        {label}
      </Text>
      <TabList
        borderRadius='24px'
        borderColor='linear(to-r, #1ACFB4, #0ABBD8)'
        border='2px'
      >
        <Tab
          color={onSectionChange ? 'main.900' : ''}
          borderRadius='22px'
          fontWeight='semibold'
          border='none'
          bgGradient={TabOneColor}
          onClick={onToggleRendredMovies}
        >
          {buttonTextOne}
        </Tab>
        <Tab
          className='textFlow'
          borderRadius='22px'
          border='none'
          fontWeight='semibold'
          color={onSectionChange ? '' : 'main.900'}
          onClick={onToggleRendredMovies}
          bgGradient={TabTwoColor}
        >
          {buttonTextTwo}
        </Tab>
      </TabList>
    </Box>
  )
}

export default ToggleCards
