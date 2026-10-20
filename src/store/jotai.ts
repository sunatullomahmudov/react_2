import { atom } from 'jotai';
import { API } from '../api/api';
import axios from 'axios';
import { use } from 'react';



export const usersAtom = atom<any[]>([])

export const selectedUserAtom = atom<any>(null)

export const getUsersAtom = atom(
    null,
    async(_get, set) => {
        try {
            const { data } = await axios.get(API)
            set(usersAtom, data)
        } catch (error) {
            console.error(error)
        }
    }
)


export const AdduserAtom = atom(
    null,

    async(_get, set, newUser: any) => {
        try {
            await axios.post(API, newUser)

            const { data } = await axios.get(API)
            set(usersAtom, data)
        } catch (error) {
            console.error(error)
        }
    }
)

export const deleteUserAtom = atom(
    null,

    async (_get, set, id: string) => {
        try {
            await axios.delete(`${API}/${id}`)

            const { data } = await axios.get(API)

            set(usersAtom, data)
        } catch (error) {
            console.error(error)
        }
    }
)


export const EditUserAtom = atom(
    null,
    async(_get, set, user: any)=> {
        try {
            await axios.put(`${API}/${user.id}`, user)

            const { data } = await axios.get(API)
            set(usersAtom, data)
        } catch (error) {
            console.error(error)
        }
    }
)


export const changeStatusAtom = atom(
    null,
    async(_get, set, user: any) => {
        try {
            await axios.put(`${API}/${user.id}`, {
                status: !user.status
            })

            const { data } = await axios.get(API)
            set(usersAtom, data)
        } catch (error) {
            console.error(error)
        }
    }
)