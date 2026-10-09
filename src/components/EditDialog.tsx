import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { editUserAtom } from '../store/jotai'

const EditDialog = ({user, onClose}: any) => {
  let [, editUser] = useAtom(editUserAtom)
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
    if (!user || !name.trim() || !age) {
      return
    }

    let newUser = {
      ...user,
      name: name.trim(),
      age: Number(age)
    }

    editUser(newUser)
    onClose()
  }

  return (
    <Dialog open={Boolean(user)} onClose={onClose} fullWidth maxWidth="xs">
      <form onSubmit={saveUser}>
        <DialogTitle>Edit user</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField autoFocus label="Name" value={name} onChange={(event) => setName(event.target.value)} required />
            <TextField label="Age" type="number" slotProps={{ htmlInput: { min: 1 } }} value={age} onChange={(event) => setAge(event.target.value)} required />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Save changes</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
export default EditDialog
