import { Button, Flex } from '@chakra-ui/react'

const PageIndicator = (props) => {
  const currentPageIndex = props.pageNumber

  // Logic for Showing page Indicies
  let pageNumberIndicators = []
  for (let i = currentPageIndex; i > currentPageIndex - 2; i--) {
    if (i <= 0) {
      continue
    }
    pageNumberIndicators.unshift(i)

    if (i !== currentPageIndex) {
      const nextPageIndex = currentPageIndex + 1
      pageNumberIndicators.push(nextPageIndex)
    }
  }

  const firstPageIndex = pageNumberIndicators[0] - 1
  if (firstPageIndex > 0) {
    pageNumberIndicators.unshift(firstPageIndex)
  }

  const lastPageIndex =
    pageNumberIndicators[pageNumberIndicators.length - 1] + 1
  pageNumberIndicators.push(lastPageIndex)

  // Handling user interaction for changing the page
  const nextPageHandler = () => {
    props.setIndex((prevState) => prevState + 1)
  }

  const previousPageHandler = () => {
    if (currentPageIndex === 1) {
      return
    }
    props.setIndex((prevState) => prevState - 1)
  }

  const pickPageNumber = (pageNumber) => {
    if (pageNumber < 0) return
    props.setIndex(pageNumber)
  }

  return (
    <>
      <Flex justify='center' pb='80px' pt='40px'>
        <Button
          onClick={previousPageHandler}
          variant='ghost'
          color='main.900'
          mr='8px'
        >
          Previous
        </Button>
        {pageNumberIndicators.map((number) => {
          const isActive = number === props.pageNumber ? 'solid' : 'ghost'

          return (
            <Button
              colorScheme='blue'
              variant={`${isActive}`}
              ml='12px'
              key={number}
              onClick={() => pickPageNumber(number)}
            >
              {number}
            </Button>
          )
        })}
        <Button
          onClick={nextPageHandler} //{props.onNextPage}
          variant='ghost'
          color='main.900'
          ml='8px'
        >
          Next
        </Button>
      </Flex>
    </>
  )
}

export default PageIndicator
