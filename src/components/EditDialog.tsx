import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { useData } from '../store/zustand'

const EditDialog = () => {
    let editUser = useData((state: any) => state.updateUser)
    let user = useData((state: any) => state.editUser)
    let onClose = useData((state: any) => state.setEditUser)
    let name = useData((state: any) => state.editName)
    let age = useData((state: any) => state.editAge)
    let setName = useData((state: any) => state.setEditName)
    let setAge = useData((state: any) => state.setEditAge)

    let saveUser = (event: any) => {
        event.preventDefault()
        editUser({ ...user, name, age: Number(age) })
        onClose(null)
    }

    return <Dialog open={Boolean(user)} onClose={() => onClose(null)} fullWidth maxWidth="xs">
        <form onSubmit={saveUser}>
            <DialogTitle>Edit user</DialogTitle>
            <DialogContent><Stack spacing={2} sx={{ pt: 1 }}>
                <TextField label="Name" value={name} onChange={(event) => setName(event.target.value)} />
                <TextField label="Age" type="number" value={age} onChange={(event) => setAge(event.target.value)} />
            </Stack></DialogContent>
            <DialogActions><Button onClick={() => onClose(null)}>Cancel</Button><Button type="submit">Save</Button></DialogActions>
        </form>
    </Dialog>
}
export default EditDialog
