import { create } from 'zustand'

export let useData = create((set: any) => ({
    data: [
        { name: 'John', age: 30, id: 1, status: 'active' },
        { name: 'Jane', age: 25, id: 2, status: 'inactive' }
    ],
    addUser: (user: any) => set((state: any) => ({ data: [...state.data, user] })),
    deleteUser: (id: any) => set((state: any) => ({ data: state.data.filter((el: any) => el.id != id) })),
    editUser: (editUser: any) => set((state: any) => ({ data: state.data.map((el: any) => el.id == editUser.id ? editUser : el) })),
    changeStatus: (id: any) => set((state: any) => ({ data: state.data.map((el: any) => el.id == id ? { ...el, status: el.status == 'active' ? 'inactive' : 'active' } : el) }))
}))
