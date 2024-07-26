import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CreateGroup from "./components/create_group/CreateGroup";
import LoginScreen from "./components/login_signup/LoginScreen";
import SignupScreen from "./components/login_signup/SignupScreen";
import LandingPage from "./components/main_container/LandingPage";
import MainContainer from "./components/main_container/MainContainer";
import WorkArea from "./components/main_container/WorkArea";
import OnlineGroups from "./components/online_users/OnlineGroups";
import OnlineUsers from "./components/online_users/OnlineUsers";

function App() {

  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<SignupScreen />} />
        <Route element={<MainContainer />}>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/create" element={<CreateGroup />} />
          <Route path="/online-users" element={<OnlineUsers />} />
          <Route path="/online-groups" element={<OnlineGroups />} />
          <Route path="/chat" element={<WorkArea />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
