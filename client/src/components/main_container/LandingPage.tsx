import { Box } from "@mui/material";
import { chatStyles } from "./ChatStyles";

const LandingPage = () => {
  const img = require("../../assets/chat_app.jpg");
  return (
    <Box sx={chatStyles.LandingPage}>
      <Box component={"img"} src={img} alt="img"
       sx={chatStyles.imgContainer} />
    </Box>
  );
};

export default LandingPage;
