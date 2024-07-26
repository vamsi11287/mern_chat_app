import { Box } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { chatStyles } from "./ChatStyles";
import SideBar from "./SideBar";

const MainContainer = () => {
  const Nav = useNavigate();
  let token = Cookies.get("token");
  useEffect(() => {
    if (!token) {
      toast.error("token expired");
      Nav("/");
    }
  }, [token]);
  
  return (
    <>
      {token ? (
        <Box sx={chatStyles.container}>
          <SideBar />
          <Outlet />
        </Box>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default MainContainer;
