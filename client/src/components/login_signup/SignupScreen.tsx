import { Box, Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginStyles } from "./loginStyles";

const SignupScreen = () => {
  const Navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleOnchage = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };
  const handleSubmit = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
    };
    try {
      const response = await fetch(
        "http://localhost:8081/user/register",
        options
      );
      if (response.status === 201) {
        const user = await response.json();
        let date = new Date();
        date.setTime(date.getTime() + 10 * 60 * 60 * 1000);
        if (user.token) {
          Cookies.set("token", user.token, { expires: date });
          toast.success("register Success");
          Navigate("/landing");
        }
      } else {
        const err = await response.json();
        toast.error(err.error);
      }
    } catch (err) {
      toast.error('something went Wrong');
    }
  };
  const handleCreateAccount = () => {
    Navigate("/");
  };
  return (
    <Box sx={loginStyles.main}>
      <Box component={"h2"} sx={loginStyles.heading}>
        SignUp
      </Box>
      <Box sx={loginStyles.formContainer}>
        <TextField
          value={loginDetails.name}
          placeholder="Name"
          name="name"
          onChange={handleOnchage}
        />
        <TextField
          value={loginDetails.email}
          placeholder="Email"
          name="email"
          onChange={handleOnchage}
        />

        <TextField
          value={loginDetails.password}
          placeholder="Password"
          name="password"
          onChange={handleOnchage}
        />
        <Button variant="outlined" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
      <Box sx={loginStyles.nav}>
        already have account{" "}
        <Box
          onClick={handleCreateAccount}
          component={"span"}
          sx={loginStyles.clickButton}
        >
          click
        </Box>
      </Box>
    </Box>
  );
};

export default SignupScreen;
