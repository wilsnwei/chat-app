import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/signup"} element={<SignUpPage />} />
          <Route path={"/login"} element={<LoginPage />} />
          <Route path={"/settings"} element={<SettingsPage />} />
          <Route path={"/profile"} element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
