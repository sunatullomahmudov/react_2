import { useState } from 'react'
import { Avatar, Button, Card, CardActions, CardContent, Chip, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { useData } from '../store/zustand'
import AddDialog from './AddDialog'
import EditDialog from './EditDialog'
import InfoDialog from './InfoDialog'

const Catalog = () => {
    let [open, setOpen] = useState(false)
    let [query, setQuery] = useState('')
    let [status, setStatus] = useState('all')
    let [editUser, setEditUser] = useState<any>(null)
    let [infoUser, setInfoUser] = useState<any>(null)
    let data = useData((state: any) => state.data)
    let deleteUser = useData((state: any) => state.deleteUser)
    let changeStatus = useData((state: any) => state.changeStatus)

    let users = data.filter((el: any) => {
        let findName = el.name.toLowerCase().includes(query.toLowerCase())
        let findStatus = status == 'all' || el.status == status

        return findName && findStatus
    })

    return (
        <main style={{ minHeight: '100vh', background: '#f1f5f9', padding: '40px 0' }}>
            <Container maxWidth="md">
                <Stack direction="row" sx={{ mb: 3, justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <Typography variant="h4">Users</Typography>
                        <Typography color="text.secondary">Manage users with Zustand</Typography>
                    </div>
                    <Button variant="contained" onClick={() => setOpen(true)}>Add user</Button>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <TextField fullWidth placeholder="Search by name..." value={query} onChange={(event) => setQuery(event.target.value)} />
                    <FormControl sx={{ minWidth: 150 }}>
                        <InputLabel>Status</InputLabel>
                        <Select value={status} label="Status" onChange={(event) => setStatus(event.target.value)}>
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>

                <Stack spacing={2}>
                    {users.map((user: any) => {
                        return (
                            <Card key={user.id}>
                                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Avatar>{user.name[0]}</Avatar>
                                    <div>
                                        <Typography>{user.name}</Typography>
                                        <Chip size="small" label={`${user.age} years old`} />
                                        <Chip size="small" sx={{ ml: 1 }} color={user.status == 'active' ? 'success' : 'default'} label={user.status} />
                                    </div>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'end' }}>
                                    <Button onClick={() => setInfoUser(user)}>Info</Button>
                                    <Button onClick={() => setEditUser(user)}>Edit</Button>
                                    <Button color="error" onClick={() => deleteUser(user.id)}>Delete</Button>
                                    <Button variant="outlined" onClick={() => changeStatus(user.id)}>
                                        {user.status == 'active' ? 'Inactive' : 'Active'}
                                    </Button>
                                </CardActions>
                            </Card>
                        )
                    })}
                </Stack>
            </Container>

            <AddDialog open={open} setOpen={setOpen} />
            <EditDialog user={editUser} onClose={() => setEditUser(null)} />
            <InfoDialog user={infoUser} onClose={() => setInfoUser(null)} />
        </main>
    )
}

export default Catalog
