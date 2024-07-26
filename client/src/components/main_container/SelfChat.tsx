import { Box } from '@mui/material'
import { chatStyles } from './ChatStyles'

const SelfChat = () => {
  return (
    <Box
    sx={{...chatStyles.outherChat,justifyContent:'flex-end'}}
  >
    <Box
      sx={{...chatStyles.textMessage,borderRadius: "15px 15px 0px 15px",bgcolor:'rgba(111,323,44,0.8)'}}
    >
      <Box>your Chat</Box>
      <Box sx={chatStyles.timeStamp}>12:30 pm</Box>
    </Box>
  </Box>
  )
}

export default SelfChat