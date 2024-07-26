import { theme } from "../../config/Theme";

export const onlineUsersStyles = {
    onlineUsersHeading:{
        display: "flex",
        alignItems: "center",
        bgcolor:theme.bgcolors.bgColor,
        borderRadius: "15px",
        padding: "8px",
    },
    onlineUsersMap:{
        display: "flex",
        alignItems: "center",
        bgcolor:theme.bgcolors.bgColor,
        borderRadius: "15px",
        padding: "8px",
        gap:'10px',
        "&:hover": {
            bgcolor: theme.bgcolors.bgHover
          }, 
    },
    userAvatar: { bgcolor: "grey", width: 34, height: 34 },
    userName:{fontWeight:500,fontSize:'17px'},
    workPlaceChat: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRadius: "15px",
        flex: 1,
        overflow:'auto',    
          
      },
}