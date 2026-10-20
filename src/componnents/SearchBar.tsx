import { useAtom } from "jotai";
import { useDispatch, useSelector } from "react-redux";
import { Button, InputAdornment, TextField } from "@mui/material";
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
      <div className="command-panel">
        <div className="command-label"><span className="command-glyph">⌘</span> COMMAND DECK <span className="command-rule" /></div>
        <div className="command-content">
          <TextField className="command-search" placeholder="Find someone in your orbit..." value={search} onChange={(e) => dispatch(setSearch(e.target.value))} fullWidth
            slotProps={{ htmlInput: { "aria-label": "Search people" }, input: { startAdornment: <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment> } }} />
          <div className="command-actions">
            <div className="filter-group" role="group" aria-label="Filter people by status">
              <TuneRoundedIcon className="filter-icon" />
              {[{ value: "all", label: "All" }, { value: "active", label: "Active" }, { value: "inactive", label: "Inactive" }].map((option) => (
                <button key={option.value} type="button" className={`filter-chip ${status === option.value ? "selected" : ""}`} aria-pressed={status === option.value} onClick={() => dispatch(setStatus(option.value))}>{option.label}</button>
              ))}
            </div>
            <Button className="add-button" variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setOpen(true)}>Add person <span className="button-arrow">↗</span></Button>
          </div>
        </div>
      </div>
      <AddProductDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default SearchBar;
