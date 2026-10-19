import { atom } from "jotai"
import axios from "axios"
import { API } from "../api/api"

export const openAddAtom = atom(false)

export const addProductAtom = atom(null, async (_get, _set, newUser: any) => {
  try {
    await axios.post(API, newUser)
  } catch (error) {
    console.error(error)
    throw error
  }
})
