import { MouseEvent, useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

type RemoveMenuProps = {
  onRemove: () => void;
};

export const RemoveMenu: React.FunctionComponent<RemoveMenuProps> = (props) => {
  const { onRemove } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Remove">
        <IconButton
          sx={{
            backgroundColor: "error.main",
            ml: 1,
          }}
          size="medium"
          onClick={handleClick}
        >
          <DeleteIcon fontSize="small" />
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
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Are you sure?
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button color="error" onClick={handleClose}>
            No
          </Button>
          <Button color="primary" onClick={onRemove}>
            Yes
          </Button>
        </Box>
      </Popover>
    </>
  );
};
