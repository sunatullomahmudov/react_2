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
import { getProducts } from "../../store/productSlice";
import { useProductActions } from "../../store/productActions";


const EditProductDialog = ({
    open,
    handleClose,
    product,
}: any) => {
    const dispatch = useDispatch()
    const editProduct = useProductActions((state) => state.editProduct)
    const [error, setError] = useState("")
    const [saving, setSaving] = useState(false)

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

        setSaving(true)
        setError("")
        try {
            await editProduct(product.id, updateUser)
            await dispatch(getProducts() as any)
            handleClose()
        } catch {
            setError("Could not edit user")
        } finally {
            setSaving(false)
        }
      };
      return(
        <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm">
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent className="flex flex-col gap-4 pt-4">
                {error && <p className="text-red-500">{error}</p>}

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
                onClick={handleEdit}
                disabled={saving}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
      )
}

export default EditProductDialog
