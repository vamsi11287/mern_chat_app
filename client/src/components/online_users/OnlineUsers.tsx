import SearchIcon from "@mui/icons-material/Search";
import SmartphoneRoundedIcon from "@mui/icons-material/SmartphoneRounded";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { IOnLineUsers } from "../../config/interface";
import { chatStyles } from "../main_container/ChatStyles";
import { onlineUsersStyles } from "./OnlineUsersStyles";

const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState<IOnLineUsers[]>([]);
  useEffect(() => {
    fetchAllUsers();
  }, []);
  const fetchAllUsers = async () => {
    const token = Cookies.get("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await fetch("http://localhost:8080/user/allusers", options);
      const data = await res.json();
      setOnlineUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const createChat = async (id: number) => {
    const token = Cookies.get("token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/chat",
        { userId: id },
        options
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box sx={chatStyles.workAreaDiv}>
      <Box sx={onlineUsersStyles.onlineUsersHeading}>
        <IconButton>
          <SmartphoneRoundedIcon />
        </IconButton>
        <Box sx={chatStyles.singleUser}>
          <Box sx={{ ...onlineUsersStyles.userName, fontSize: "20px" }}>
            Online Users
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
            <Box
              sx={onlineUsersStyles.onlineUsersMap}
              key={item._id}
              onClick={() => createChat(item._id)}
            >
              <Avatar sx={onlineUsersStyles.userAvatar}>{item.name[0]}</Avatar>
              <Box sx={chatStyles.singleUser}>
                <Box sx={onlineUsersStyles.userName}>{item.name}</Box>
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default OnlineUsers;
