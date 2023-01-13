import SearchIcon from "@mui/icons-material/SearchOutlined";
import {
  ClickAwayListener,
  IconButton,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useEffect, useState } from "react";

type SearchButtonProps = {
  filter: string;
  onSearch: (filter: string) => void;
  sx?: TextFieldProps["sx"];
};

export const SearchButton: React.FunctionComponent<SearchButtonProps> = ({
  filter,
  onSearch,
  sx,
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleClickAway = () => {
    if (filter.length === 0) setOpen(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return isOpen ? (
    <ClickAwayListener onClickAway={handleClickAway}>
      <TextField
        label="Search"
        value={filter}
        onChange={handleSearch}
        size="small"
        sx={{
          ...sx,
        }}
      />
    </ClickAwayListener>
  ) : (
    <IconButton sx={{ ...sx }} onClick={() => setOpen(true)}>
      <SearchIcon />
    </IconButton>
  );
};
