import { create } from "zustand"
import axios from "axios"
import { API } from "../api/api"

type ProductActions = {
  editProduct: (id: string, updateUser: any) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  changeStatus: (id: string, status: boolean) => Promise<void>
}

export const useProductActions = create<ProductActions>(() => ({
  editProduct: async (id, updateUser) => {
    try {
      await axios.put(`${API}/${id}`, updateUser)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  deleteProduct: async (id) => {
    try {
      await axios.delete(`${API}/${id}`)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  changeStatus: async (id, status) => {
    try {
      await axios.put(`${API}/${id}`, { status })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}))
