import { Avatar, Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { chatStyles } from "./ChatStyles";

const OutherChat = () => {
  const { chatData, receiver } = useSelector(
    (state: RootState) => state.ChatSlice
  );
  const [loading, setLoading] = useState(false);
  const loadingMessages = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadingMessages();
  }, [receiver]);

  return (
    <>
      {loading ? (
        <Box sx={chatStyles.loading}>
          <CircularProgress />
        </Box>
      ) : 
        receiver && chatData  ?
        chatData.contents.map((item) => (
          <Box
            sx={
              receiver !== item.receiver
                ? chatStyles.outherChat
                : chatStyles.selgChat
            }
            key={item._id}
          >
            {receiver !== item.receiver && (
              <Avatar sx={chatStyles.userAvatar}>{receiver[0]}</Avatar>
            )}
            <Box sx={chatStyles.textMessage}>
              <Box>{item.message}</Box>
              <Box sx={chatStyles.timeStamp}>{item.timestamp}</Box>
            </Box>
          </Box>
        ))
       : 
      <Box
      sx={
        chatStyles.outherChat 
      }
    >
    </Box>}
    </>
  );
};

export default OutherChat;
