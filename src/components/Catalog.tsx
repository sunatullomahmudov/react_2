import { Avatar, Button, Card, CardActions, CardContent, Checkbox, Chip, Container, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { useData } from '../store/zustand'
import AddDialog from './AddDialog'
import EditDialog from './EditDialog'
import InfoDialog from './InfoDialog'

const Catalog = () => {
    let query = useData((state: any) => state.query)
    let status = useData((state: any) => state.status)
    let setOpen = useData((state: any) => state.setOpen)
    let setQuery = useData((state: any) => state.setQuery)
    let setStatus = useData((state: any) => state.setStatus)
    let setEditUser = useData((state: any) => state.setEditUser)
    let infoUser = useData((state: any) => state.infoUser)
    let setInfoUser = useData((state: any) => state.setInfoUser)
    let data = useData((state: any) => state.data)
    let deleteUser = useData((state: any) => state.deleteUser)
    let changeStatus = useData((state: any) => state.changeStatus)

    let users = data.filter((el: any) => {
        let findName = el.name.toLowerCase().includes(query.toLowerCase())
        let findStatus = status == 'all' || el.status == status

        return findName && findStatus
    })

    return (
        <main style={{ minHeight: '100vh', background: '#f1f5f9', padding: '22px 0' }}>
            <Container maxWidth="md">
                <Stack direction="row" sx={{ mb: 3 }}>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                        ADD USER
                    </Button>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        placeholder="Search by name..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        slotProps={{ input: { startAdornment: <SearchIcon sx={{ mr: 1, color: '#8da1bd' }} /> } }}
                    />
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
                            <Card key={user.id} variant="outlined" sx={{ minHeight: 170 }}>
                                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'center', pt: 3 }}>
                                    <Avatar sx={{ bgcolor: '#1976d2', width: 50, height: 50 }}>
                                        {user.name[0]}
                                    </Avatar>
                                    <div>
                                        <Typography sx={{ fontWeight: 700, fontSize: 20 }}>{user.name}</Typography>
                                        <Chip size="small" label={`${user.age} years old`} />
                                        <Chip size="small" sx={{ ml: 1 }} color={user.status == 'active' ? 'success' : 'default'} label={user.status} />
                                    </div>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'end', mt: 4, pr: 2 }}>
                                    <IconButton color="info" onClick={() => setInfoUser(user)}>
                                        <InfoIcon />
                                    </IconButton>
                                    <IconButton color="primary" onClick={() => setEditUser(user)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => deleteUser(user.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <input type="checkbox" checked={user.status == 'active'} onChange={() => changeStatus(user.id)} />
                                </CardActions>
                            </Card>
                        )
                    })}
                </Stack>
            </Container>

            <AddDialog />
            <EditDialog />
            <InfoDialog user={infoUser} onClose={() => setInfoUser(null)} />
        </main>
    )
}

export default Catalog
