import SearchIcon from "@mui/icons-material/Search";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { chatStyles } from "../main_container/ChatStyles";
import { onlineUsersStyles } from "./OnlineUsersStyles";

const OnlineGroups = () => {
  const onlineUsers = [
    {
      id: 1,
      img: "",
      name: "vamsi",
    },
    {
      id: 2,
      img: "",
      name: "venky",
    },
    {
      id: 3,
      img: "",
      name: "surya",
    },
    {
      id: 4,
      img: "",
      name: "naidu",
    },
  ];
  return (
    <Box sx={chatStyles.workAreaDiv}>
      <Box sx={onlineUsersStyles.onlineUsersHeading}>
        <IconButton>
          <SmartphoneRoundedIcon />
        </IconButton>
        <Box sx={chatStyles.singleUser}>
          <Box sx={{ ...onlineUsersStyles.userName, fontSize: "20px" }}>
            Online Groups
          </Box>
        </Box>
      </Box>

      <Box sx={chatStyles.sideBarTopIconAndSearch}>
        <TextField
          sx={chatStyles.sideBarSearch}
          variant="outlined"
          placeholder="Search Users"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={onlineUsersStyles.workPlaceChat}>
        {onlineUsers.length > 0 &&
          onlineUsers.map((item) => (
            <Box sx={onlineUsersStyles.onlineUsersMap} key={item.id}>
              <Avatar sx={onlineUsersStyles.userAvatar}>{item.img}</Avatar>
              <Box sx={chatStyles.singleUser}>
                <Box sx={onlineUsersStyles.userName}>{item.name}</Box>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default OnlineGroups;
