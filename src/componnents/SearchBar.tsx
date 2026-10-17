import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, MenuItem, TextField } from "@mui/material";
import AddProductDialog from "./dialogs/AddproductDialog";
import { setSearch, setStatus } from "../store/productSlice";

const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { search, status } = useSelector((state: any) => state.products);

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
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
        <TextField
        select
        label="Status"
        value={status}
        onChange={(e) => dispatch(setStatus(e.target.value))}
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
