import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSetAtom } from "jotai";

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
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Add User
      </DialogTitle>

      <DialogContent className="flex flex-col gap-4 pt-4">
        {error && <p className="text-red-500">{error}</p>}
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Phone"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <TextField
          label="Image URL"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClose}
          color="error"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleAdd}
          disabled={saving}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
