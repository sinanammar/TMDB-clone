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

// Layouts
import RootLayout from './layouts/RootLayout'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path=':id' element={<MovieDetails />} />
        <Route path='search/:title' element={<SearchResults />} />
        <Route path='search/:title/keywords' element={<KeywordsSearch />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
