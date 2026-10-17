import { useState } from "react";
import { Button, MenuItem, TextField } from "@mui/material";
import AddProductDialog from "./dialogs/AddproductDialog";

const SearchBar = ({ search, setSearch, status, setStatus, }: any) => {
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        sx={{ minWidth: "160px"}}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>

        </TextField>

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