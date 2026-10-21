import axios from "axios";
import { create } from "zustand";
import { API } from "./api/api";



export const useUserStore = create<any>((set) => ({
    users: [],

    selectedUser: null,

    getUsers: async () => {
        try {
            const { data } = await axios.get(API)
            set({users: data,})
        } catch (error) {
            console.error(error)
        }
    },

    addUser: async (newUser: any) => {
        try {
            await axios.post(API, newUser)

            const { data } = await axios.get(API)
            set({users: data})
        } catch (error) {
            console.error(error)
        }
    },


    deleteUser: async(id: string) => {
        try {
            await axios.delete(`${API}/${id}`)

            const { data } = await axios.get(API)
            set({users: data})
        } catch (error) {
            console.error(error)
        }
    },


    editUser: async (user: any) => {
        try {
            await axios.put(`${API}/${user.id}`, user)

            const { data } = await axios.get(API)
            set({users: data})
        } catch (error) {
            console.error(error)
        }
    },


    changeStatus: async (user: any) => {
        try {
            await axios.put(`${API}/${user.id}`,{status: !user.status})

            const { data } = await axios.get(API)
            set({users: data})
        } catch (error) {
            console.error(error)
        }
    },

    setSelectedUser: (user: any) => {
        set({
            selectedUser: user
        })
    }
}))