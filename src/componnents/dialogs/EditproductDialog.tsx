import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editProduct, getProducts } from "../../store/productSlice";


const EditProductDialog = ({
    open,
    handleClose,
    product,
}: any) => {
    const dispatch = useDispatch()

      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState("");
      const [image, setImage] = useState("");

      useEffect(() => {
        if(product) {
            setName(product.name)
            setEmail(product.email)
            setPhone(product.phone)
            setImage(product.image)
        }
      },[product])

      const handleEdit = async () => {
        const updateUser = {
            name,
            email,
            phone,
            image,
            status: product.status
        }

        await dispatch(
            editProduct({
                id: product.id, updateUser
            }) as any
        )

        dispatch(getProducts() as any)

        handleClose()
      };
      return(
        <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm">
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent className="flex flex-col gap-4 pt-4">

                <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth/>

                <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth/>

                <TextField
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                fullWidth/>

                <TextField
                label="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                fullWidth/>

            </DialogContent>

            <DialogActions>
                <Button
                color="error"
                onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                variant="contained"
                onClick={handleEdit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
      )
}

export default EditProductDialog