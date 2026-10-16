import { useState } from "react";
import { Button, TextField } from "@mui/material";
import AddProductDialog from "./dialogs/AddproductDialog";

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <TextField
          label="Search users"
          variant="outlined"
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            minWidth: "150px",
            borderRadius: "12px",
          }}
        >
          Add User
        </Button>
      </div>

      <AddProductDialog
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};

export default SearchBar;