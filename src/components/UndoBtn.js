import React from "react";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import { blue } from "@mui/material/colors";

const UndoBtn = ({ handleUndo }) => {
  return (
    <Button
      variant="contained"
      startIcon={<ReplayIcon />}
      sx={{ backgroundColor: blue[200] }}
      onClick={handleUndo}
    >
      Undo
    </Button>
  );
};

export default UndoBtn;
