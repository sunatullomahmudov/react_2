import { create } from 'zustand'

export let useData = create((set: any) => ({
    data: [
        { name: 'John', age: 30, id: 1, status: 'active' },
        { name: 'Jane', age: 25, id: 2, status: 'inactive' }
    ],
    open: false,
    query: '',
    status: 'all',
    editUser: null,
    infoUser: null,
    addName: '',
    addAge: '',
    editName: '',
    editAge: '',

    setOpen: (open: any) => set({ open }),
    setQuery: (query: any) => set({ query }),
    setStatus: (status: any) => set({ status }),
    setInfoUser: (infoUser: any) => set({ infoUser }),
    setAddName: (addName: any) => set({ addName }),
    setAddAge: (addAge: any) => set({ addAge }),
    setEditName: (editName: any) => set({ editName }),
    setEditAge: (editAge: any) => set({ editAge }),
    setEditUser: (editUser: any) => set({
        editUser,
        editName: editUser ? editUser.name : '',
        editAge: editUser ? String(editUser.age) : ''
    }),
    addUser: (user: any) => set((state: any) => ({ data: [...state.data, user] })),
    deleteUser: (id: any) => set((state: any) => ({ data: state.data.filter((el: any) => el.id != id) })),
    updateUser: (editUser: any) => set((state: any) => ({ data: state.data.map((el: any) => el.id == editUser.id ? editUser : el) })),
    changeStatus: (id: any) => set((state: any) => ({ data: state.data.map((el: any) => el.id == id ? { ...el, status: el.status == 'active' ? 'inactive' : 'active' } : el) }))
}))
