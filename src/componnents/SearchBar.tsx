import { useAtom } from "jotai";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AddProductDialog from "./dialogs/AddproductDialog";
import { openAddAtom } from "../store/addProductAtom";
import { setSearch, setStatus } from "../store/productSlice";

const SearchBar = () => {
  const [open, setOpen] = useAtom(openAddAtom);
  const dispatch = useDispatch();
  const { search, status } = useSelector((state: any) => state.products);

  return (
    <>
      <div className="toolbar">
        <TextField className="search-field" placeholder="Search by name..." value={search} onChange={(e) => dispatch(setSearch(e.target.value))} aria-label="Search users" fullWidth
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment> } }} />
        <TextField className="filter-field" select value={status} onChange={(e) => dispatch(setStatus(e.target.value))} aria-label="Filter by status"
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><TuneRoundedIcon /></InputAdornment> } }}>
          <MenuItem value="all">All status</MenuItem><MenuItem value="active">Active</MenuItem><MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
        <Button className="add-button" variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setOpen(true)}>Add person</Button>
      </div>
      <AddProductDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
};
export default SearchBar;
