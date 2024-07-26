import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChatData, getConversation, messageArrived } from "../../redux/slice/ChatSlice";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { AppDispatch, RootState } from "../../redux/store";
import { chatStyles } from "./ChatStyles";
import LandingPage from "./LandingPage";
import OutherChat from "./OutherChat";


const WorkArea = () => {
  const Navigate = useNavigate();
  const POLL_INTERVAL = 500;
  const { chatData, receiver,createdNewMessage } = useSelector(
    (state: RootState) => state.ChatSlice
  );
  const [message, setMessage] = useState("");
  const moveToLandingPage = () => {
    Navigate("/landing");
  };
  const dispatch = useDispatch<AppDispatch>();

  const changeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
   if(message.trim().length>0) {
    const data = {
      userA: "",
      userB: receiver,
      sender: "",
      receiver: receiver,
      message: message,
    };
    dispatch(getConversation(data));
    setTimeout(() => {
      dispatch(messageArrived(false));
      dispatch(getChatData(receiver))
    }, 1000);
    setTimeout(() => {
      handleScroll();
    }, 1500);
    setMessage("");
   }
  };

  const [isScroll,setIsScroll] = useState(false)
  

  const handleScroll = () => {
    setIsScroll(true)
    const chatScroll = document.getElementById("chatScroll");
    if (chatScroll) {
      chatScroll.scrollBy(0, chatScroll.scrollHeight + 200);
    }
    setInterval(()=>{
      setIsScroll(false)
    },100)
  };

  const readline =()=>{
    dispatch(getChatData(receiver))
  }
  useEffect(() => {
    const intervalId = setInterval(readline, POLL_INTERVAL);

    return () => clearInterval(intervalId); 
  }, [createdNewMessage,receiver]);

  return (
    <>
      {  receiver ? (
        <Box sx={chatStyles.workAreaDiv} id="messages">
          <Box sx={chatStyles.personalChatHeader}>
            <IconButton>
              <AccountCircleIcon sx={chatStyles.userAvatarSingle} />
            </IconButton>
            <Box sx={chatStyles.singleUserDiv}>
              <Box sx={chatStyles.singleUser}>
                <Box>{receiver}</Box>
                <Box sx={chatStyles.checkingOnline}>Online</Box>
              </Box>
              <IconButton onClick={moveToLandingPage}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>

          {chatData && chatData.contents.length>0  ? <Box sx={chatStyles.workPlaceChat} id="chatScroll">
            <OutherChat />
          </Box>
          :

          <Box sx={chatStyles.workPlaceChat} >
            <OutherChat />
          </Box>
          }

         <ExpandCircleDownIcon sx={chatStyles.scrollData} onClick={handleScroll} /> 

          <Box sx={chatStyles.sideBarTopIconAndSearch}>
            <TextField
              sx={chatStyles.sideBarSearch}
              value={message}
              variant="outlined"
              placeholder="Type message..."
              onChange={changeMessage}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleSendMessage}>
                    <SendRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default WorkArea;
