import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
const InfoDialog = ({user, onClose}: any) => {
  return (
    <Dialog open={Boolean(user)} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>User information</DialogTitle>
      <DialogContent>
        {user && (
          <Stack spacing={1.5} sx={{ py: 1, alignItems: 'center' }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: 24 }}>
              {user.name[0]?.toUpperCase()}
            </Avatar>
            <Typography variant="h6">{user.name}</Typography>
            <Typography color="text.secondary">Age: {user.age}</Typography>
            <Typography variant="caption" color="text.secondary">ID: {user.id}</Typography>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
export default InfoDialog
