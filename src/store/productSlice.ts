import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../api/api"

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  try {
    const { data } = await axios.get(API)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
})

const initialState: {
  data: any[]
  loading: boolean
  error: string | null
  search: string
  status: string
  page: number
} = {
  data: [],
  loading: false,
  error: null,
  search: "",
  status: "all",
  page: 1,
}

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload
      state.page = 1
    },
    setStatus: (state, action) => {
      state.status = action.payload
      state.page = 1
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true
      state.error = null
    })
    .addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      const filtered = state.data.filter((product) => {
        const matchesSearch = (product.name || "").toLowerCase().includes(state.search.toLowerCase())
        const matchesStatus = state.status === "all" ||
          (state.status === "active" && product.status === true) ||
          (state.status === "inactive" && product.status === false)
        return matchesSearch && matchesStatus
      })
      state.page = Math.min(state.page, Math.max(1, Math.ceil(filtered.length / 6)))
    })
    .addCase(getProducts.rejected, (state) => {
      state.loading = false
      state.error = "Error loading users"
    })
  },
})

export const { setSearch, setStatus, setPage } = productSlice.actions
export default productSlice.reducer
