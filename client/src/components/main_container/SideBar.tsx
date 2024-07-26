import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import NightlightIcon from "@mui/icons-material/Nightlight";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  allUsers,
  getChatData,
  receiverName,
} from "../../redux/slice/ChatSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { chatStyles } from "./ChatStyles";

const SideBar = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users, createdNewMessage } = useSelector(
    (state: RootState) => state.ChatSlice
  );
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const handleShowUsers = () => {
    Navigate("/online-users");
  };
  const handleShowGroups = () => {
    Navigate("/online-groups");
  };
  const handleCreateGroup = () => {
    Navigate("/create");
  };
  const [receiver, setReceiver] = useState("");
  const handleOpenChat = (name: string) => {
    setReceiver(name);
    dispatch(receiverName(name));
    dispatch(getChatData(name));
    Navigate("/chat");
  };

  const handleChangeMode = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleLogOut = () => {
    Cookies.remove("token");
    Navigate("/");
  };

  useEffect(() => {
    dispatch(allUsers());
    receiver && dispatch(getChatData(receiver));
  }, [createdNewMessage]);

  return (
    <Box sx={chatStyles.sideBarDiv}>
      <Box sx={chatStyles.sideBarTopIcons}>
        <IconButton>
          <AccountCircleIcon />
        </IconButton>
        <Box>
          <IconButton onClick={handleShowUsers}>
            <PersonAddIcon />
          </IconButton>
          <IconButton onClick={handleShowGroups}>
            <GroupAddIcon />
          </IconButton>
          <IconButton onClick={handleCreateGroup}>
            <AddCircleIcon />
          </IconButton>
          <IconButton onClick={handleChangeMode}>
            {!isDarkTheme ? <NightlightIcon /> : <LightModeIcon />}
          </IconButton>
          <IconButton onClick={handleLogOut}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={chatStyles.sideBarTopIconAndSearch}>
        <TextField
          sx={chatStyles.sideBarSearch}
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={chatStyles.sideBarBottomUsers}>
        {users.length>0 && users.map((conversation, index) => {
          return (
            <Box
              sx={chatStyles.users}
              onClick={() => handleOpenChat(conversation?.name)}
              key={conversation._id}
            >
              <Avatar src="" alt={conversation.name} />
              <Box>{conversation.name}</Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SideBar;
