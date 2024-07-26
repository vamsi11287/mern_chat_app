export const chatStyles = {
  container: {
    height: "90vh",
    width: "93vw",
    bgcolor: "rgb(213, 219, 227)",
    borderRadius: "20px",
    display: "flex",
  },
  personalChatHeader: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    bgcolor: "#fff",
    borderRadius: "15px",
    padding: "2.5px",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  scrollData:{position:'absolute',bottom:'18%',right:'6%',width:'50px',height:'50px'},
  sideBarDiv: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    flex: { md: 0.25, sm: 0.3 },
    padding: "10px",
  },
  workAreaDiv: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    flex: { md: 0.75, sm: 0.7 },
  },
  sideBarTopIcons: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "#fff",
    borderRadius: "15px",
    padding: "8px",
  },
  sideBarTopIconAndSearch: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "#fff",
    borderRadius: "15px",
  },
  workPlaceChat: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    borderRadius: "15px",
    flex: 1,
    bgcolor: "#fff",
    overflow: "auto",
  },

  sideBarSearch: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        borderColor: "none",
      },
      "&.Mui-focused fieldset": {
        borderColor: "none",
      },
    },
  },
  createGroup: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      "& fieldset": {
        border: "2px solid",
      },
      "&:hover fieldset": {
        border: "2px solid",
      },
      "&.Mui-focused fieldset": {
        border: "2px solid",
      },
    },
  },
  users: {
    display: "flex",
    padding: "6px",
    borderRadius: "10px",
    alignItems: "center",
    width: "100%",
    gap: "10px",
    cursor: "pointer",
    "&:hover": {
      bgcolor: "rgba(237, 241, 247,0.9)",
    },
  },
  userAvatar: { bgcolor: "orange", width: 34, height: 34 },
  userAvatarSingle: { width: 34, height: 34 },
  sideBarBottomUsers: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    bgcolor: "#fff",
    borderRadius: "15px",
    padding: "8px",
    height: "100%",
  },
  singleUser: { display: "flex", flexDirection: "column" },
  singleUserDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  checkingOnline: { fontSize: "13px" },
  outherChat: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    gap: "5px",
  },
  selgChat: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: "5px",
  },
  textMessage: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    width: "maxContent",
    padding: "6px 10px",
    fontSize: "15px",
    borderRadius: "15px 15px 15px 0px",
    bgcolor: "rgba(237, 221, 247,1)",
  },
  timeStamp: {
    fontSize: "10px",
    display: "flex",
    justifyContent: "flex-end",
  },
  createButton: {
    bgcolor: "green",
    color: "white",
    borderRadius: "15px",
    "&:hover": {
      bgcolor: "green",
    },
  },
  closeButton: {
    bgcolor: "orange",
    color: "white",
    borderRadius: "15px",
    "&:hover": {
      bgcolor: "orange",
    },
  },
  LandingPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    gap: "10px",
    padding: "10px",
    flex: { md: 0.75, sm: 0.7 },
  },
  imgContainer: {
    objectFit: "cover",
    height: "70%",
    width: "70%",
    borderRadius: "20px",
  },
};
