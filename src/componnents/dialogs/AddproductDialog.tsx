import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import { addProduct } from "../../store/productSlice";

const AddProductDialog = ({ open, handleClose }: any) => {
  const dispatch = useDispatch();

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

    await dispatch(addProduct(newUser) as any);

    setName("");
    setEmail("");
    setPhone("");
    setImage("");

    handleClose();
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
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;