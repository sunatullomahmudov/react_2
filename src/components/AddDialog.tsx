import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { useData } from '../store/zustand'

const AddDialog = () => {
    let addUser = useData((state: any) => state.addUser)
    let open = useData((state: any) => state.open)
    let setOpen = useData((state: any) => state.setOpen)
    let name = useData((state: any) => state.addName)
    let age = useData((state: any) => state.addAge)
    let setName = useData((state: any) => state.setAddName)
    let setAge = useData((state: any) => state.setAddAge)

    let addNewUser = (event: any) => {
        event.preventDefault()

        addUser({ name, age: Number(age), id: Date.now(), status: 'active' })
        setOpen(false)
        setName('')
        setAge('')
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
            <form onSubmit={addNewUser}>
                <DialogTitle>Add user</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ pt: 1 }}>
                        <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} required />
                        <TextField label="Age" type="number" value={age} onChange={(event) => setAge(event.target.value)} required />
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
