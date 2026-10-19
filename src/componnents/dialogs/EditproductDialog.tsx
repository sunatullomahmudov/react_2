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
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import { IconButton } from "@mui/material";
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
      return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" slotProps={{ paper: { className: "premium-dialog" }, backdrop: { className: "dialog-backdrop" } }}>
          <DialogTitle className="dialog-title"><div><span className="dialog-eyebrow">PEOPLE DIRECTORY / EDIT</span><h2>Edit details<span>.</span></h2><p>Keep your people’s details up to date.</p></div><IconButton aria-label="Close dialog" onClick={handleClose} className="dialog-close"><CloseRoundedIcon /></IconButton></DialogTitle>
          <DialogContent className="dialog-content">
            {error && <p className="dialog-error" role="alert">{error}</p>}
            <div className="dialog-fields">
              <TextField label="Full name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <TextField label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
              <TextField label="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
              <TextField label="Image URL" value={image} onChange={(e) => setImage(e.target.value)} fullWidth />
            </div>
          </DialogContent>
          <DialogActions className="dialog-actions"><Button onClick={handleClose} className="dialog-cancel">Cancel</Button><Button className="dialog-submit" variant="contained" onClick={handleEdit} disabled={saving} startIcon={<DoneRoundedIcon />}>{saving ? "Saving..." : "Save changes"}</Button></DialogActions>
        </Dialog>
      )
}
export default EditProductDialog
