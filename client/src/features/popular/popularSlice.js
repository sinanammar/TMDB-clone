import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  popular: [],
  status: 'idle',
  pageIndex: 1,
}

export const fetchPopular = createAsyncThunk(
  'popular/fetchPopular',
  async (accessToken, { getState }) => {
    const state = getState()

    try {
      const response = await axios.get(
        `http://localhost:5000/api/movies/popular/${state.popular.pageIndex}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )

      const popularMovies = response.data

      state.popular.pageIndex === 1
        ? window.scrollTo(0, 0)
        : window.scrollTo(0, 850)
      return popularMovies
    } catch (e) {
      console.errro(e)
    }
  }
)

const popularSlice = createSlice({
  name: 'popular',
  initialState,
  reducers: {
    onNextPageChange(state) {
      state.pageIndex++
      state.status = 'idle'
    },
    onPreviousPageChange(state) {
      state.pageIndex--
      state.status = 'idle'
    },
    onPickingPageNumber(state, action) {
      state.pageIndex = action.payload
      state.status = 'idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPopular.pending, (state) => {
        state.status = 'idle'
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.popular = action.payload
      })
  },
})

export const { onNextPageChange, onPreviousPageChange, onPickingPageNumber } =
  popularSlice.actions

export default popularSlice.reducer
