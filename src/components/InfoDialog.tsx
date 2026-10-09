import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'

const InfoDialog = ({user, onClose}: any) => {
    return (
        <Dialog open={Boolean(user)} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>User information</DialogTitle>
            <DialogContent>
                {user && (
                    <Stack spacing={2} sx={{ py: 2, alignItems: 'center' }}>
                        <Avatar sx={{ width: 64, height: 64 }}>
                            {user.name[0]}
                        </Avatar>
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography>Age: {user.age}</Typography>
                        <Typography>Status: {user.status}</Typography>
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
