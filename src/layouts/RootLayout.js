// Hooks
import { Outlet } from 'react-router-dom'

// Components
import Footer from '../components/Footer'
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
