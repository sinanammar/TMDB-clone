import { configureStore } from '@reduxjs/toolkit'

// Slices
import trendingReducer from '../features/trending/trendingSlice'
import popularReducer from '../features/popular/popularSlice'
import watchlistReducer from '../features/popular/watchlistSlice'

export default configureStore({
  reducer: {
    trending: trendingReducer,
    popular: popularReducer,
    watchlist: watchlistReducer,
  },
})
