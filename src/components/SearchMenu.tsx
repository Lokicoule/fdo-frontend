import { MouseEvent, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { Fab } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

type SearchMenuProps = Pick<IconButtonProps, "size"> & {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: () => void;
};

export const SearchMenu: React.FunctionComponent<SearchMenuProps> = (props) => {
  const { onSearch, onSearchSubmit, size } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton
          sx={{
            ml: 1,
            backgroundColor: "primary.main",
          }}
          size={size}
          onClick={handleClick}
        >
          <SearchIcon fontSize={size === "large" ? "medium" : "small"} />
        </IconButton>
      </Tooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            fullWidth
            onChange={onSearch}
            placeholder="Search"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Fab
                    size="small"
                    color="primary"
                    onClick={onSearchSubmit}
                    sx={{ ml: 1 }}
                  >
                    <SearchIcon fontSize="small" />
                  </Fab>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Popover>
    </>
  );
};
