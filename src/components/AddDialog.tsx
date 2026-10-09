import { useState } from 'react'
import { useAtom } from 'jotai'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { addUserAtom } from '../store/jotai'

const AddDialog = ({open, setOpen}: any) => {
    let [, addUser] = useAtom(addUserAtom)
    let [name, setName] = useState('')
    let [age, setAge] = useState('')

    let addNewUser = (event: any) => {
        event.preventDefault()
        if (!name.trim() || !age) {
            return
        }

        let newUser = {
            name: name.trim(),
            age: Number(age),
            id: Date.now()
        }

        addUser(newUser)
        setName('')
        setAge('')
        setOpen(false)
    }
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <form onSubmit={addNewUser}>
            <DialogTitle>Add user</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ pt: 1 }}>
                    <TextField autoFocus label="Name" value={name} onChange={(event) => setName(event.target.value)} required />
                    <TextField label="Age" type="number" slotProps={{ htmlInput: { min: 1 } }} value={age} onChange={(event) => setAge(event.target.value)} required />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" variant="contained">Add user</Button>
            </DialogActions>
        </form>
    </Dialog>
  )
}

export default AddDialog
