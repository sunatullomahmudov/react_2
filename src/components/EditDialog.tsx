import { useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { useData } from '../store/zustand'

const EditDialog = ({user, onClose}: any) => {
    let editUser = useData((state: any) => state.editUser)
    let [name, setName] = useState('')
    let [age, setAge] = useState('')

    useEffect(() => {
        if (user) {
            setName(user.name)
            setAge(String(user.age))
        }
    }, [user])

    let saveUser = (event: any) => {
        event.preventDefault()
        editUser({ ...user, name, age: Number(age) })
        onClose()
    }

    return <Dialog open={Boolean(user)} onClose={onClose} fullWidth maxWidth="xs">
        <form onSubmit={saveUser}>
            <DialogTitle>Edit user</DialogTitle>
            <DialogContent><Stack spacing={2} sx={{ pt: 1 }}>
                <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} />
                <TextField label="Age" type="number" value={age} onChange={(event) => setAge(event.target.value)} />
            </Stack></DialogContent>
            <DialogActions><Button onClick={onClose}>Cancel</Button><Button type="submit">Save</Button></DialogActions>
        </form>
    </Dialog>
}
export default EditDialog
