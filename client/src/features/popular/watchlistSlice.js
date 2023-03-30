import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const addToWatchlist = createAsyncThunk(
  'watchlist/addToWatchlist',
  async ({ movie, accessToken }) =>
    await axios.post('http://localhost:5000/api/watchlist', movie, {
      headers: {
        Authorization: accessToken,
      },
    })
)

export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async (accessToken) => {
    try {
      const response = await axios.get('http://localhost:5000/api/watchlist', {
        headers: {
          Authorization: accessToken,
        },
      })
      return response.data
    } catch (e) {
      throw e
    }
  }
)

export const clearWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async (accessToken) => {
    try {
      await axios.delete('http://localhost:5000/api/clear/watchlist', {
        headers: {
          Authorization: accessToken,
        },
      })
    } catch (e) {
      throw e.message
    }
  }
)

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    watchlist: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        if (action.payload.data.deleted === 'true') {
          state.watchlist = state.watchlist.filter(
            (movie) => movie.id !== action.payload.data.movieId
          )
        }
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.watchlist = action.payload
      })
  },
})

export default watchlistSlice.reducer
