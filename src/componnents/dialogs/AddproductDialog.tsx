import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSetAtom } from "jotai";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import { IconButton } from "@mui/material";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { getProducts } from "../../store/productSlice";
import { addProductAtom } from "../../store/addProductAtom";

const AddProductDialog = ({ open, handleClose }: any) => {
  const dispatch = useDispatch();
  const addProduct = useSetAtom(addProductAtom);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = async () => {
    const newUser = {
      name,
      email,
      phone,
      image,
      status: true,
    };

    setSaving(true);
    setError("");
    try {
      await addProduct(newUser);
      await dispatch(getProducts() as any);
      setName("");
      setEmail("");
      setPhone("");
      setImage("");
      handleClose();
    } catch {
      setError("Could not add user");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" slotProps={{ paper: { className: "premium-dialog" }, backdrop: { className: "dialog-backdrop" } }}>
      <DialogTitle className="dialog-title"><div><span className="dialog-eyebrow">PEOPLE DIRECTORY / NEW</span><h2>Add a person<span>.</span></h2><p>Bring someone new into your orbit.</p></div><IconButton aria-label="Close dialog" onClick={handleClose} className="dialog-close"><CloseRoundedIcon /></IconButton></DialogTitle>
      <DialogContent className="dialog-content">
        {error && <p className="dialog-error" role="alert">{error}</p>}
        <div className="dialog-fields">
          <TextField label="Full name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Email address" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Phone number" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
          <TextField label="Image URL" fullWidth value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
      </DialogContent>
      <DialogActions className="dialog-actions"><Button onClick={handleClose} className="dialog-cancel">Cancel</Button><Button className="dialog-submit" variant="contained" onClick={handleAdd} disabled={saving} startIcon={<PersonAddAlt1RoundedIcon />}>{saving ? "Adding..." : "Add person"}</Button></DialogActions>
    </Dialog>
  );
};
export default AddProductDialog;
