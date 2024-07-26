import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { chatStyles } from "../main_container/ChatStyles";

const CreateGroup = () => {
  const [open, setOpen] = React.useState(true);
  const Navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    Navigate("/landing");
  };
  return (
    <Dialog open={open} onClose={handleClose} sx={chatStyles.workAreaDiv}>
      <DialogTitle>{"Create Group"}</DialogTitle>
      <DialogContent>
        <Box sx={chatStyles.sideBarTopIconAndSearch}>
          <TextField
            sx={chatStyles.createGroup}
            variant="outlined"
            placeholder="Group Name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SendRoundedIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={chatStyles.closeButton}>
          Close
        </Button>
        <Button onClick={handleClose} sx={chatStyles.createButton}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroup;
