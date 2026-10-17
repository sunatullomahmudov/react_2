import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API } from "../api/api"
import axios from 'axios'

// Get
export const getProducts = createAsyncThunk(
  "product/getProducts",

  async () => {
    try {
      const { data } = await axios.get(API)

      return data
    } catch (error: any) {
      console.error(error)
    }
  }
)

const initialState: {
  data: any[];
  loading: boolean;
  error: string | null
}= {
  data: [],
  loading: false,
  error: null
}

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, 
      (state) => {
        state.loading = true
        state.error = null
      }
    )
    .addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false,
      state.data = action.payload;
    })
    .addCase(getProducts.rejected, (state) => {
      state.loading = false,
      state.error = "Error"
    })
    .addCase(addProduct.pending, (state) => {
      state.loading = true
    })
    .addCase(addProduct.fulfilled, (state, action) => {
      state.loading = false,
      state.data.push(action.payload)
    })
    .addCase(addProduct.rejected, (state)=> {
      state.loading = false,
      state.error = "Add user error"
    })
  }
})


// Add
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (newUser: any) => {
    try {
      const { data } = await axios.post(API, newUser);

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Delete
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: string) => {
    try {
      await axios.delete(`${API}/${id}`)
      return id
    } catch (error) {
      console.error(error)
      throw error
    }
  }
)



// Edit
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async({ id, updateUser}: any) => {
    try {
      const { data } = await axios.put(`${API}/${id}`, updateUser)
      return data
    } catch (error) {
      console.error(error)
    }
  }
)


export default productSlice.reducer