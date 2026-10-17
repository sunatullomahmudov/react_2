import axios from "axios"
import { API } from "../api/api"
import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"



export const getProducts = createAsyncThunk("product/getProduct",
    async () => {
        try {
            let { data } = await axios.get(API)
            return data
        } catch (error) {
            console.error(error)
        }
    }
)


const initialState:{
    data: []
    loading: boolean;
    error: any} = {
        data: [],
        loading: false,
        error: null

}

export const dataSlice = createSlice ({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(getProducts.pending,(state) => {
            state.loading = true;
            state.error = null
        }   
        )
        .addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})