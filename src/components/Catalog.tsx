import { useState } from 'react'
import { useAtom } from 'jotai'
import { Avatar, Button, Card, CardActions, CardContent, Chip, Container, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { changeStatusAtom, dataAtom, deleteUserAtom } from '../store/jotai'
import AddDialog from './AddDialog'
import EditDialog from './EditDialog'
import InfoDialog from './InfoDialog'

const Catalog = () => {
  let [addOpen, setAddOpen] = useState(false)
  let [query, setQuery] = useState('')
  let [status, setStatus] = useState('all')
  let [editingUser, setEditingUser] = useState<any>(null)
  let [infoUser, setInfoUser] = useState<any>(null)
  let [data] = useAtom(dataAtom)
  let [, deleteUser] = useAtom(deleteUserAtom)
  let [, changeStatus] = useAtom(changeStatusAtom)

  let visibleUsers = data.filter((el) => {
    let findName = el.name.toLowerCase().includes(query.toLowerCase())
    let findStatus = status == 'all' || el.status == status

    return findName && findStatus
  })

  return (
    <main className="min-h-screen bg-slate-100 py-10">
      <Container maxWidth="md">
        <Stack
          spacing={2}
          className="mb-6"
          sx={{
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { sm: 'center' }
          }}
        >
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setAddOpen(true)}>
            Add user
          </Button>
        </Stack>

        <Stack direction="row" spacing={2} className="mb-5">
          <TextField
            fullWidth
            placeholder="Search by name..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            slotProps={{
              input: {
                startAdornment: <SearchIcon className="mr-2 text-slate-400" />
              }
            }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(event) => setStatus(event.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Typography variant="body2" color="text.secondary" className="mb-3">
          {visibleUsers.length} user(s)
        </Typography>

        <Stack spacing={2}>
          {visibleUsers.map((user) => {
            return (
              <Card
                key={user.id}
                variant="outlined"
              >
                <CardContent className="flex items-center gap-3 !pb-2">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {user.name[0]?.toUpperCase()}
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <Typography sx={{ fontWeight: 600 }}>
                      {user.name}
                    </Typography>
                    <Chip size="small" label={`${user.age} years old`} />
                    <Chip
                      size="small"
                      color={user.status == 'active' ? 'success' : 'default'}
                      label={user.status}
                      className="ml-2"
                    />
                  </div>
                </CardContent>
                <CardActions className="justify-end !px-4 !pb-3">
                  <IconButton color="info" onClick={() => setInfoUser(user)}>
                    <InfoOutlinedIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => setEditingUser(user)}>
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => deleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <input type="checkbox" checked={user.status === 'active'} onChange={() => changeStatus(user.id)} />
                </CardActions>
              </Card>
            )
          })}

          {!visibleUsers.length && (
            <Card variant="outlined">
              <CardContent>
                <Typography align="center" color="text.secondary">
                  No users found.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Stack>
      </Container>

      <AddDialog open={addOpen} setOpen={setAddOpen} />
      <EditDialog user={editingUser} onClose={() => setEditingUser(null)} />
      <InfoDialog user={infoUser} onClose={() => setInfoUser(null)} />
    </main>
  )
}
export default Catalog
