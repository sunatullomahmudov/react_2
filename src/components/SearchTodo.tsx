import { observer } from "mobx-react-lite";

import {
  InputAdornment,
  TextField,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import { todoStore } from "../store/todoStore";

const SearchTodo = observer(() => {
  return (
    <TextField
      size="small"
      placeholder="Search todo..."
      value={todoStore.search}
      onChange={(e) =>
        todoStore.setSearch(e.target.value)
      }
      sx={{
        width: {
          xs: "100%",
          md: 300,
        },

        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "#f9fafb",
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
});

export default SearchTodo;