import { atom } from 'jotai'

export let dataAtom = atom([
    {
        name: 'John',
        age: 30,
        id: 1,
        status: 'active'
    },
    {
        name: 'Jane',
        age: 25,
        id: 2,
        status: 'inactive'
    }
])

export let deleteUserAtom = atom(null, (get: any, set: any, id: any) => {
    let newData = get(dataAtom).filter((el: any) => el.id != id)

    set(dataAtom, newData)
})

export let addUserAtom = atom(null, (get: any, set: any, newUser: any) => {
    set(dataAtom, [...get(dataAtom), newUser])
})

export let editUserAtom = atom(null, (get: any, set: any, editUser: any) => {
    let newData = get(dataAtom).map((el: any) => {
        if (el.id == editUser.id) {
            return editUser
        }

        return el
    })

    set(dataAtom, newData)
})

export let changeStatusAtom = atom(null, (get: any, set: any, id: any) => {
    let newData = get(dataAtom).map((el: any) => {
        if (el.id == id) {
            return {
                ...el,
                status: el.status == 'active' ? 'inactive' : 'active'
            }
        }

        return el
    })

    set(dataAtom, newData)
})
