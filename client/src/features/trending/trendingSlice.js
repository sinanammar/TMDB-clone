import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  trending: [],
  status: 'idle',
}

export const fetchTrending = createAsyncThunk(
  'trending/fetchTrending',
  async ({ timeWindow, accessToken }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/trending/${timeWindow}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      const trendingMovies = response.data
      return trendingMovies
    } catch (e) {
      throw e.message
    }
  }
)

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {
    onTimeWindowChange(state, action) {
      if (state.timeWindow === 'day') {
        state.timeWindow = 'week'
      } else {
        state.timeWindow = 'day'
      }
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.trending = action.payload
      })
  },
})

export const { onTimeWindowChange } = trendingSlice.actions

export default trendingSlice.reducer
