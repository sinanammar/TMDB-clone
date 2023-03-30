import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

// pages
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import KeywordsSearch from './pages/KeywordsSearch'
import SearchResults from './pages/Search'
import Signup from './pages/Signup'
import Login from './pages/login'

// Layouts
import RootLayout from './layouts/RootLayout'
import Watchlist from './components/watchlist/Watchlist'

// Hooks
import { useCookies } from 'react-cookie'
import { useState } from 'react'

function App() {
  const [cookies] = useCookies()
  const [isLoggedIn, setIsLoggedIn] = useState(
    cookies.jwt !== '' && cookies.jwt !== undefined
  )

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={
          <RootLayout setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        }
      >
        <Route index element={isLoggedIn ? <Home /> : <Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route
          path='watchlist'
          element={isLoggedIn ? <Watchlist /> : <Login />}
        />
        <Route path=':id' element={isLoggedIn ? <MovieDetails /> : <Login />} />
        <Route
          path='search/:title'
          element={isLoggedIn ? <SearchResults /> : <Login />}
        />
        <Route path='search/:title/keywords' element={<KeywordsSearch />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
